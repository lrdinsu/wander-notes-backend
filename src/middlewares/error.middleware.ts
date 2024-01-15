import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import { HTTP_RESPONSE_CODE } from '@/constants/constant.js';
import { HttpError } from '@/errors/errors.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware: ErrorRequestHandler = (err, _, res, __) => {
  if (err instanceof ZodError) {
    console.error('💎', err.errors);
    res.status(HTTP_RESPONSE_CODE.BAD_REQUEST).json({
      status: 'fail',
      message: '💎Zod Error: Invalid data',
      data: err.errors,
    });
    return;
  }

  const error = err as HttpError;
  const statusCode = error.statusCode || HTTP_RESPONSE_CODE.SERVER_ERROR;
  const status = error.status || 'error';
  const message = error.message || 'Internal Server Error';

  console.error('💥', error.stack);

  res.status(statusCode).json({
    status: status,
    message: `💥, ${message}`,
  });
};
