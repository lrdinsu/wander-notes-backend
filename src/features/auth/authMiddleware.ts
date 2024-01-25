import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { UserMessage } from '@/constants/constant.js';
import { prisma } from '@/db/index.js';
import { RoleType } from '@/db/zod/index.js';
import { ForbiddenError, UnauthorizedError } from '@/errors/errors.js';

type JwtPayload = {
  id: number;
  iat: number;
  exp: number;
};

async function jwtVerify(token: string, secret: string): Promise<JwtPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if ((err ?? !decoded) || typeof decoded !== 'object') {
        return reject(err);
      }
      resolve(decoded as JwtPayload);
    });
  });
}

function hasPasswordChanged(
  jwtTimestamp: number,
  passwordChangedAt: Date | null,
) {
  if (passwordChangedAt) {
    const changedTimestamp = passwordChangedAt.getTime();
    // jwtTimestamp is in seconds, changedTimestamp is in milliseconds
    // jwtTimestamp is rounded down to the nearest second, changedTimestamp is not
    return (jwtTimestamp + 1) * 1000 < changedTimestamp;
  }

  return false;
}

export async function protectRoute(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  try {
    // 1) Getting token and check if it's there
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedError(UserMessage.UNAUTHORIZED_ACCESS_ERROR);
    }

    // 2) Verification token
    const decoded = await jwtVerify(token, process.env.JWT_SECRET!);

    // 3) Check if user still exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) {
      throw new UnauthorizedError(
        'The user belonging to this token does no longer exist.',
      );
    }

    // 4) Check if user changed password after the token was issued
    if (hasPasswordChanged(decoded.iat, user.passwordChangedAt)) {
      throw new UnauthorizedError(
        'User recently changed password! Please log in again.',
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

export const restrictTo = (...roles: RoleType[]) => {
  return (req: Request, _: Response, next: NextFunction) => {
    try {
      if (!roles.includes(req.user!.role)) {
        throw new ForbiddenError(
          'You do not have permission to perform this action',
        );
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
