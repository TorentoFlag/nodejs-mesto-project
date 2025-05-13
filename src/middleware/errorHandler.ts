import {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';
import { INTERNAL_SERVER_ERROR } from '../const';
import IHttpError from '../interfaces/IError';

const ErrorHandler: ErrorRequestHandler = (
  error: IHttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = error.status || INTERNAL_SERVER_ERROR;
  const message = status === INTERNAL_SERVER_ERROR ? 'На сервере произошла ошибка' : error.message;

  res.status(status).json({ message });
};

export default ErrorHandler;
