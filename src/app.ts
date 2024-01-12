import express, { Express } from 'express';

import { tourRouter } from '@/routes/tourRoutes.js';
import { userRouter } from '@/routes/userRoutes.js';

import { errorMiddleware } from './middlewares/error.middleware.js';

export const app: Express = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Error handling middleware
app.use(errorMiddleware);
