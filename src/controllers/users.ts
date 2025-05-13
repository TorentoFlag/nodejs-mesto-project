import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import BadRequestError from '../errors/BadRequestError';
import NotFoundError from '../errors/NotFoundError';
import { RequestWithUser } from '../interfaces/RequestWithUser';
import { IUser } from '../interfaces/IUser';
import User from '../models/User';

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
    if (!isValidObjectId(userId)) {
      throw new BadRequestError('Некорректные данные при запросе пользователя');
    }
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
    if (!req.body) {
      throw new BadRequestError('Переданы некорректные данные при создании пользователя');
    }
    const {
      name, about, avatar, email, password,
    } = req.body;
    const user = new User({
      name, about, avatar, email, password,
    });
    await user.save();
    res.status(200).send(user);
  } catch (err) {
    if (err instanceof Error && err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      return;
    }
    next(err);
  }
};

export const updateProfile = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (!req.body) {
    throw new BadRequestError('Переданы некорректные данные при редактировании профиля');
  }
  try {
    const _id = req.user?._id;
    const { name, about } = req.body;
    const newUser = { name, about } as Partial<IUser>;
    const user = await User.findByIdAndUpdate(_id, newUser, { new: true });
    if (!user) {
      throw new NotFoundError('Пользователь с указанным _id не найден');
    }
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

export const updateAvatar = async (req: RequestWithUser, res: Response) => {
  if (!req.body) {
    throw new BadRequestError('Переданы некорректные данные при обновлении аватара');
  }
  try {
    const _id = req.user?._id;
    const { avatar } = req.body;
    const newUser = { avatar } as Partial<IUser>;
    const user = await User.findByIdAndUpdate(_id, newUser, { new: true });
    if (!user) {
      throw new NotFoundError('Пользователь с указанным _id не найден');
    }
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
  }
};
