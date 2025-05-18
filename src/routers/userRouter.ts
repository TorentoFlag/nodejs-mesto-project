import { Router } from 'express';
import { profileUpdateValidator, avatarUpdateValidator, objectIdValidator } from '../middleware/validation';
import {
  getAllUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getUser,
} from '../controllers/users';

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/me', getUser);
userRouter.get('/:userId', objectIdValidator, getUserById);
userRouter.patch('/me', profileUpdateValidator, updateProfile);
userRouter.patch('/me/avatar', avatarUpdateValidator, updateAvatar);

export default userRouter;
