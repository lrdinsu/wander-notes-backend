import express, { Router } from 'express';

import { checkID } from '@/middlewares/checkID.js';

import { protectRoute, restrictTo } from '../auth/authMiddleware.js';
import {
  aliasTopTours,
  createTour,
  deleteTour,
  getAllTours,
  getMonthlyPlan,
  getTour,
  getTourStats,
  updateTour,
} from './tourController.js';

export const tourRouter: Router = express.Router();

tourRouter.param('id', checkID);

tourRouter.route('/top-5-cheap').get(aliasTopTours).get(getAllTours);
tourRouter.route('/stats').get(getTourStats);
tourRouter.route('/monthly-plan/:year').get(getMonthlyPlan);

tourRouter.route('/').get(protectRoute, getAllTours).post(createTour);
tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(protectRoute, restrictTo('ADMIN'), deleteTour);
