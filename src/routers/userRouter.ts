import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} from '../controllers/users';

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:userId', getUserById);
userRouter.patch('/me', updateProfile);
userRouter.patch('/me/avatar', updateAvatar);
userRouter.post('/', createUser);

export default userRouter;
