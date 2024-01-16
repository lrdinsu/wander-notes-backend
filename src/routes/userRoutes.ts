import express, { Router } from 'express';

import { login, signup } from '@/controllers/authController.js';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '@/controllers/userController.js';

export const userRouter: Router = express.Router();

userRouter.route('/signup').post(signup);
userRouter.route('/login').post(login);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
