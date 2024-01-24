import express, { Router } from 'express';

import {
  forgotPassword,
  login,
  resetPassword,
  signup,
  updatePassword,
} from '@/controllers/authController.js';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '@/controllers/userController.js';
import { protectRoute } from '@/middlewares/authMiddleware.js';

export const userRouter: Router = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/forgotPassword', forgotPassword);
userRouter.patch('/resetPassword/:token', resetPassword);
userRouter.patch('/updatePassword', protectRoute, updatePassword);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
