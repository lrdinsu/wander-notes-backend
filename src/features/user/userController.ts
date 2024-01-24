import type { NextFunction, Request, Response } from 'express';

import { HttpStatusCode, UserMessage } from '@/constants/constant.js';
import { prisma } from '@/db/index.js';
import { UserCreateInputSchema, UserPartialSchema } from '@/db/zod/index.js';

export const getAllUsers = async (_: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  res.status(HttpStatusCode.OK).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = UserCreateInputSchema.parse(req.body);
    const newUser = await prisma.user.create({
      data: user,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    res.status(201).json({
      status: 'success',
      message: 'New user created!',
      data: {
        newUser,
      },
    });
  } catch (e) {
    next(e);
  }
};

export const getUser = (_: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

export async function updateMe(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.user!;
    const updatedData = UserPartialSchema.parse(req.body);

    await prisma.user.update({
      where: { id },
      data: updatedData,
    });

    res.status(HttpStatusCode.OK).json({
      status: 'success',
      message: UserMessage.UPDATED,
    });
  } catch (e) {
    next(e);
  }
}

export const updateUser = (_: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

export const deleteUser = (_: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
