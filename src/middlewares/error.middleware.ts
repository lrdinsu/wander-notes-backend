import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import { AppMessage, HttpStatusCode } from '@/constants/constant.js';
import { HttpError } from '@/errors/errors.js';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library.js';

type ProcessErrorReturn = {
  statusCode: HttpStatusCode;
  status: string;
  message: string;
  zodError?: {
    [x: string]: string[] | undefined;
    [x: number]: string[] | undefined;
    [x: symbol]: string[] | undefined;
  };
};

function processError(err: unknown): ProcessErrorReturn {
  // Zod Error
  if (err instanceof ZodError) {
    return processZodError(err);
    // Prisma Error
  } else if (err instanceof PrismaClientKnownRequestError) {
    return processPrismaError(err);
    // HttpError
  } else if (err instanceof HttpError) {
    return {
      statusCode: err.statusCode,
      status: err.status,
      message: `🌐 ${err.message}`,
    };
    // Other errors
  } else if (err instanceof Error) {
    return {
      statusCode: HttpStatusCode.SERVER_ERROR,
      status: 'error',
      message: `💥 ${err.message}`,
    };
  }

  return {
    statusCode: HttpStatusCode.SERVER_ERROR,
    status: 'error',
    message: AppMessage.SERVER_ERROR,
  };
}

function processZodError(err: ZodError) {
  const flattenErrors = err.flatten().fieldErrors;

  // Make the error message more readable
  const fieldErrors = Object.entries(flattenErrors).map(
    ([field, message]) => `${field}: ${message?.[0]}`,
  );

  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    status: 'fail',
    message: `💎Zod Error: ${fieldErrors.join('\n')}`,
    zodError: flattenErrors,
  };
}

function processPrismaError(err: PrismaClientKnownRequestError) {
  // Unique constraint error
  if (err.code === 'P2002') {
    const field = (err.meta?.target as string[]).join(', ');

    return {
      statusCode: HttpStatusCode.CONFLICT,
      status: 'fail',
      message: `⚠️Prisma Error: ['${field}'] already exists`,
    };
  }

  // An operation failed because it depends on one or more records that were required but not found
  if (err.code === 'P2025') {
    return {
      statusCode: HttpStatusCode.NOT_FOUND,
      status: 'fail',
      message: `⚠️Prisma Error: ${err.meta?.cause as string}`,
    };
  }

  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    status: 'fail',
    message: `⚠️ ${AppMessage.DATABASE_ERROR} : ${err.code}`,
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware: ErrorRequestHandler = (err, _, res, __) => {
  const { statusCode, status, message, zodError } = processError(err);
  const result: Record<string, unknown> = { status, message };

  console.error(zodError ?? err);

  if (process.env.NODE_ENV === 'development' && zodError) {
    result.zodError = zodError;
  }

  res.status(statusCode).json(result);
};
