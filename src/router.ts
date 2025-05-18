import { Router } from 'express';
import userRouter from './routers/userRouter';
import cardRouter from './routers/cardRouter';

const router = Router();

router.use('/users', userRouter);
router.use('/cards', cardRouter);

export default router;
