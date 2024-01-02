import express, { Router } from 'express';

import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '@/controllers/userControllers.js';

export const userRouter: Router = express.Router();
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
