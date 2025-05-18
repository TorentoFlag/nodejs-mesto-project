import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IDuplicateError } from '../interfaces/IDuplicateError';
import ConflictError from '../errors/ConflictError';
import { JWT_SECRET } from '../const';
import BadRequestError from '../errors/BadRequestError';
import NotFoundError from '../errors/NotFoundError';
import { RequestWithUser } from '../interfaces/RequestWithUser';
import { IUser } from '../interfaces/IUser';
import User from '../models/User';
import UnauthorizedError from '../errors/UnauthorizedError';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('Пользователь с указанным _id не найден');
    }
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.create(req.body);
    res.status(200).send(user);
  } catch (err) {
    if ((err as IDuplicateError).cause?.code === 11000) {
      next(new ConflictError('Такой email уже зарегистрирован'));
      return;
    }
    if (err instanceof Error && err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      return;
    }
    next(err);
  }
};

export const updateProfile = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const _id = req.user?._id;
    const { name, about } = req.body;
    const newUser = { name, about } as Partial<IUser>;
    const user = await User.findByIdAndUpdate(_id, newUser, { new: true, runValidators: true });
    if (!user) {
      throw new NotFoundError('Пользователь с указанным _id не найден');
    }
    res.status(200).send(user);
  } catch (err) {
    if (err instanceof Error && err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      return;
    }
    next(err);
  }
};

export const updateAvatar = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const _id = req.user?._id;
    const { avatar } = req.body;
    const newUser = { avatar } as Partial<IUser>;
    const user = await User.findByIdAndUpdate(_id, newUser, { new: true, runValidators: true });
    if (!user) {
      throw new NotFoundError('Пользователь с указанным _id не найден');
    }
    res.status(200).send(user);
  } catch (err) {
    if (err instanceof Error && err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      return;
    }
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Неверный логин или пароль');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new UnauthorizedError('Неверный логин или пароль');
    }

    if (!JWT_SECRET) {
      throw new NotFoundError('Не найдена переменная "JWT_SECRET"');
    } else {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
      );

      res.cookie('jwt', token, {
        maxAge: 604800000,
        httpOnly: true,
      }).end();
    }
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { user } = req;
  const userId = user?._id;
  try {
    const findUser = await User.findById(userId);
    if (!findUser) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.status(200).send(findUser);
  } catch (err) {
    next(err);
  }
};
