import type { NextFunction, Request, Response } from 'express';

import { HttpStatusCode, UserMessage } from '@/constants/constant.js';
import { prisma } from '@/db/index.js';
import { UserCreateInputSchema } from '@/db/zod/index.js';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '@/errors/errors.js';
import { checkPassword } from '@/utils/checkPassword.js';
import { generateToken } from '@/utils/generateToken.js';
import { UserEmailSchema, UserLoginSchema } from '@/validates/schemas.js';
import argon2 from '@node-rs/argon2';

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
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    // Generate token
    const token = generateToken(newUser.id);

    res.status(HttpStatusCode.OK).json({
      status: 'success',
      message: UserMessage.CREATED,
      token,
      data: {
        user: newUser,
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
      token,
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

    // 2) Generate the random reset token
  } catch (e) {
    next(e);
  }
}

export function resetPassword(
  _: Request,
  res: Response,
  __: NextFunction,
): void {
  res.status(HttpStatusCode.OK).json({
    status: 'success',
    message: 'This route is not yet defined!',
  });
}
