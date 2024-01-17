import express, { Router } from 'express';

import {
  aliasTopTours,
  createTour,
  deleteTour,
  getAllTours,
  getMonthlyPlan,
  getTour,
  getTourStats,
  updateTour,
} from '@/controllers/tourController.js';
import { authMiddleware } from '@/middlewares/authMiddleware.js';
import { checkID } from '@/middlewares/checkID.js';

export const tourRouter: Router = express.Router();

tourRouter.param('id', checkID);

tourRouter.route('/top-5-cheap').get(aliasTopTours).get(getAllTours);
tourRouter.route('/stats').get(getTourStats);
tourRouter.route('/monthly-plan/:year').get(getMonthlyPlan);

tourRouter.route('/').get(authMiddleware, getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
