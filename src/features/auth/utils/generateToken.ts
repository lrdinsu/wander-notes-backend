import jwt from 'jsonwebtoken';

export function generateToken(id: number) {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}
