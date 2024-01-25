import express, { type Express } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { errorMiddleware } from '@/middlewares/errorMiddleware.js';

import { NotFoundError } from './errors/errors.js';
import { tourRouter } from './features/tour/tourRoutes.js';
import { userRouter } from './features/user/userRoutes.js';

export const app: Express = express();

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
  limit: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

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
