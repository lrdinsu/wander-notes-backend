import express, { Express } from 'express';

import { tourRouter } from '@/routes/tourRoutes.js';
import { userRouter } from '@/routes/userRoutes.js';

import { HTTP_RESPONSE_CODE } from './constants/constant.js';
import { HttpError } from './errors/errors.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

export const app: Express = express();

// app.set('query parser', queryParser);

// Middlewares
app.use(express.json());

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, _, next) => {
  const err = new HttpError(
    `Can't find "${req.originalUrl}" on this server!`,
    HTTP_RESPONSE_CODE.NOT_FOUND,
  );

  next(err);
});

// Error handling middleware
app.use(errorMiddleware);
