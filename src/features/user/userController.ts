import type { NextFunction, Request, Response } from 'express';

import { HttpStatusCode, UserMessage } from '@/constants/constant.js';
import { prisma } from '@/db/index.js';
import { UserCreateInputSchema, UserPartialSchema } from '@/db/zod/index.js';
import { BadRequestError } from '@/errors/errors.js';
import { generateUserInResponse } from '@/features/user/utils/generateUserInResponse.js';
import { filterByAllowedFields } from '@/utils/filterByAllowedFields.js';

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
    });

    res.status(201).json({
      status: 'success',
      message: UserMessage.CREATED,
      data: {
        user: generateUserInResponse(newUser),
      },
    });
  } catch (e) {
    next(e);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    const user = await prisma.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new BadRequestError(UserMessage.NOT_FOUND);
    }

    res.status(HttpStatusCode.OK).json({
      status: 'success',
      message: 'User found!',
      data: {
        user: generateUserInResponse(user),
      },
    });
  } catch (e) {
    next(e);
  }
};

export async function updateMe(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = req.user!;
    const updatedData = UserPartialSchema.parse(req.body);

    // Prevent user from updating password
    if (updatedData.password) {
      throw new BadRequestError(
        'This route is not for password updates. Please use /updatePassword.',
      );
    }

    // Filter out unwanted fields
    const filteredData = filterByAllowedFields(updatedData, 'name', 'email');

    // Update user
    await prisma.user.update({
      where: { id: user.id },
      data: filteredData,
    });

    res.status(HttpStatusCode.OK).json({
      status: 'success',
      message: UserMessage.UPDATED,
      data: {
        user: generateUserInResponse(user),
      },
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

export async function deleteMe(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = req.user!;

    await prisma.user.update({
      where: { id: user.id },
      data: { deleted: true },
    });

    res.status(HttpStatusCode.NO_CONTENT).send();
  } catch (e) {
    next(e);
  }
}

export const deleteUser = (_: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
