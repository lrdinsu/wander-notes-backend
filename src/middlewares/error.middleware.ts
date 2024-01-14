import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import { HttpError } from '@/types/errors.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware: ErrorRequestHandler = (err, _, res, __) => {
  if (err instanceof ZodError) {
    console.error('💎', err.errors);
    res.status(400).json({
      status: 'fail',
      message: '💎Zod Error: Invalid data',
      data: err.errors,
    });
    return;
  }

  console.log(err.stack);

  const error = err as HttpError;
  const statusCode = error.statusCode || 500;
  const status = error.status || 'error';
  const message = error.message || 'Internal Server Error';

  console.error('💥', message);
  res.status(statusCode).json({
    status: status,
    message: `💥, ${message}`,
  });
};
