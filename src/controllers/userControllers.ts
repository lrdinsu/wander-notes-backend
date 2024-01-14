import { NextFunction, Request, Response } from 'express';

import { prisma } from '@/db/index.js';

import { UserCreateInputSchema } from '../../prisma/generated/zod/index.js';

export const getAllUsers = (_: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
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
