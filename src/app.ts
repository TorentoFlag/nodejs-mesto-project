import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import NotFoundError from './errors/NotFoundError';
import { loginValidator, userValidation } from './middleware/validation';
import auth from './middleware/auth';
import { createUser, login } from './controllers/users';
import connectToDb from './config/db';
import router from './router';
import ErrorHandler from './middleware/errorHandler';
import { requestLogger, errorLogger } from './middleware/logger';

const app = express();
app.use(express.json());
app.use(cookieParser());

connectToDb();

app.use(requestLogger);

app.post('/signin', loginValidator, login);
app.post('/signup', userValidation, createUser);

app.use(auth);
app.use('/', router);
router.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);
app.use(ErrorHandler);

export default app;
