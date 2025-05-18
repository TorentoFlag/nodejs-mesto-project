import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../const';
import { RequestWithUser } from '../interfaces/RequestWithUser';
import UnauthorizedError from '../errors/UnauthorizedError';
import NotFoundError from '../errors/NotFoundError';

interface IPayload {
  _id: string;
}

const auth = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    if (!token) {
      throw new UnauthorizedError('Неверный логин или пароль');
    }

    if (!JWT_SECRET) {
      throw new NotFoundError('Не найдена переменная "JWT_SECRET"');
    }
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Ошибка авторизации'));
  }

  req.user = payload as IPayload;
  next();
};

export default auth;
