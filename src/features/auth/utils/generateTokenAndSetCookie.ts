import type { Response } from 'express';
import jwt from 'jsonwebtoken';

export function generateTokenAndSetCookie(id: number, res: Response) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * ONE_DAY_IN_MILLISECONDS,
    ),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  });

  return token;
}
