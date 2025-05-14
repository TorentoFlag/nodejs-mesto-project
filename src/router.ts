import { Router } from 'express';
import NotFoundError from './errors/NotFoundError';
import userRouter from './routers/userRouter';
import cardRouter from './routers/cardRouter';

const router = Router();

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

export default router;
