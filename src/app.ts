import express, { type Express } from 'express';

import { errorMiddleware } from '@/middlewares/errorMiddleware.js';

import { NotFoundError } from './errors/errors.js';
import { tourRouter } from './features/tour/tourRoutes.js';
import { userRouter } from './features/user/userRoutes.js';

export const app: Express = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, _, next) => {
  const err = new NotFoundError(
    `Can't find "${req.originalUrl}" on this server!`,
  );

  next(err);
});

// Error handling middleware
app.use(errorMiddleware);
