import * as crypto from 'crypto';
import type { NextFunction, Request, Response } from 'express';

import { HttpStatusCode, UserMessage } from '@/constants/constant.js';
import { prisma } from '@/db/index.js';
import { UserCreateInputSchema } from '@/db/zod/index.js';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '@/errors/errors.js';
import { generateToken } from '@/features/auth/utils/generateToken.js';
import { generateUserInResponse } from '@/features/user/utils/generateUserInResponse.js';
import { sendPasswordResetEmail } from '@/utils/email.js';
import {
  UserEmailSchema,
  UserLoginSchema,
  UserPasswordSchema,
  UserResetPasswordSchema,
} from '@/validates/schemas.js';
import argon2 from '@node-rs/argon2';

import { checkPassword } from './utils/checkPassword.js';

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = UserCreateInputSchema.parse(req.body);

    // Check if user(email) already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      throw new BadRequestError(UserMessage.EMAIL_DUPLICATE_ERROR);
    }

    // Hash password and create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: await argon2.hash(password),
      },
    });

    // Generate token
    const token = generateToken(newUser.id);

    res.status(HttpStatusCode.CREATED).json({
      status: 'success',
      message: UserMessage.CREATED,
      token,
      data: {
        user: generateUserInResponse(newUser),
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = UserLoginSchema.parse(req.body);

    // Check if user exists or password is correct
    const user = await prisma.user.findUnique({ where: { email } });
    const isCorrectPassword = await checkPassword(user?.password, password);
    if (!isCorrectPassword || !user) {
      throw new UnauthorizedError(UserMessage.AUTHENTICATION_ERROR);
    }

    // Generate token
    const token = generateToken(user.id);

    res.status(HttpStatusCode.OK).json({
      status: 'success',
      message: 'Login successfully',
      token,
      data: {
        user: generateUserInResponse(user),
      },
    });
  } catch (e) {
    next(e);
  }
}

export async function forgotPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // 1) Get user based on POSTed email
    const { email } = UserEmailSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundError(UserMessage.EMAIL_NOT_FOUND_ERROR);
    }

    // 2) Generate the random reset token and send it to user's email
    const resetPasswordToken = crypto.randomBytes(32).toString('hex');
    const ONE_HOUR = 60 * 60 * 1000;
    const resetPasswordExp = new Date(Date.now() + ONE_HOUR);

    await prisma.$transaction(async (prisma) => {
      await prisma.user.update({
        where: { email },
        data: {
          resetPasswordToken,
          resetPasswordExp,
        },
      });

      await sendPasswordResetEmail(resetPasswordToken, email);
    });

    // Reset passwordResetToken and passwordResetExpires if user didn't reset password in 1 hour
    setTimeout(async () => {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          resetPasswordToken: null,
          resetPasswordExp: null,
        },
      });
    }, ONE_HOUR);

    res.status(HttpStatusCode.OK).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (e) {
    next(e);
  }
}

export async function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { token: resetPasswordToken } = req.params;
    const { password } = UserPasswordSchema.parse(req.body);

    // 1) Get user based on the token
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken,
        resetPasswordExp: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      throw new BadRequestError('Token is invalid or has expired');
    }

    // 2) Hash new password
    const newPassword = await argon2.hash(password);

    // 3) Update password adn passwordChangedAt property for the user
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: newPassword,
        passwordChangedAt: new Date(),
        resetPasswordToken: null,
        resetPasswordExp: null,
      },
    });

    // Log the user in, send JWT
    const token = generateToken(user.id);

    res.status(HttpStatusCode.OK).json({
      status: 'success',
      message: 'Password reset successfully',
      token,
      data: {
        user: generateUserInResponse(user),
      },
    });
  } catch (e) {
    next(e);
  }
}

export async function updatePassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // Get user
    const currentUser = req.user!;
    const { currentPassword, newPassword } = UserResetPasswordSchema.parse(
      req.body,
    );

    // Check if POSTed current password is correct
    const isCorrectPassword = await checkPassword(
      currentUser?.password,
      currentPassword,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedError('Invalid password!');
    }

    // Update password
    const hashedNewPassword = await argon2.hash(newPassword);
    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        password: hashedNewPassword,
        passwordChangedAt: new Date(),
      },
    });

    // Log the user in, send JWT
    const token = generateToken(currentUser.id);

    res.status(HttpStatusCode.OK).json({
      status: 'success',
      message: 'Password updated successfully',
      token,
      data: {
        user: generateUserInResponse(currentUser),
      },
    });
  } catch (e) {
    next(e);
  }
}
