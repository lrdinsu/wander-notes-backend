import express, { Router } from 'express';

import {
  forgotPassword,
  login,
  resetPassword,
  signup,
} from '@/controllers/authController.js';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '@/controllers/userController.js';

export const userRouter: Router = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/forgotPassword', forgotPassword);
userRouter.post('/resetPassword', resetPassword);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
