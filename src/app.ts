import express, { Express } from 'express';

import { tourRouter } from '@/routes/tourRoutes.js';
import { userRouter } from '@/routes/userRoutes.js';
import { dataPath } from '@/utils/path.js';

export const app: Express = express();

// Middlewares
// build in middleware function
app.use(express.json());
app.use(express.static(`${dataPath}/../img`));

//my own middleware function, ALWAYS use next()
app.use((_, __, next) => {
  console.log('Hello from the middleware🍓');
  next();
});

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
