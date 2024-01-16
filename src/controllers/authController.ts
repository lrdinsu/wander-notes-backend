import type { NextFunction, Request, Response } from 'express';

import { HttpStatusCode, UserMessage } from '@/constants/constant.js';
import { prisma } from '@/db/index.js';
import { UserCreateInputSchema } from '@/db/zod/index.js';
import { BadRequestError, UnauthorizedError } from '@/errors/errors.js';
import { checkPassword } from '@/utils/checkPassword.js';
import { generateToken } from '@/utils/generateToken.js';
import { UserLoginSchema } from '@/validates/schemas.js';
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
      throw new BadRequestError(UserMessage.EMAIL_ALREADY_EXISTS);
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
      throw new UnauthorizedError(UserMessage.AUTHENTICATION_FAILED);
    }

    // Generate token
    const token = generateToken(user.id);

    res.status(HttpStatusCode.OK).json({
      status: 'success',
      token,
      message: UserMessage.LOGIN_SUCCESS,
    });
  } catch (e) {
    next(e);
  }
}
