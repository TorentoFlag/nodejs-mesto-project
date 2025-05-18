import { celebrate, Joi } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { URL_REGEXP } from '../const';
import BadRequestError from '../errors/BadRequestError';
import UnauthorizedError from '../errors/UnauthorizedError';

const errors = {
  name: new BadRequestError('Имя должно быть строкой от 2 до 30 символов'),
  about: new BadRequestError('Описание должно быть строкой от 2 до 200 символов'),
  avatar: new BadRequestError('Аватар должен быть ссылкой'),
  email: new BadRequestError('Email должен быть валидным'),
  password: new BadRequestError('Введите пароль'),
  login: new UnauthorizedError('Неверный логин или пароль'),
  link: new BadRequestError('Введите валидную ссылку'),
  id: new BadRequestError('Передан неверный ID'),
};

export const userValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).error(errors.name),
    about: Joi.string().min(2).max(200).error(errors.about),
    avatar: Joi.string().regex(URL_REGEXP).error(errors.avatar),
    email: Joi.string().required().email().error(errors.email),
    password: Joi.string().required().error(errors.password),
  }),
});

export const loginValidator = celebrate({
  body: Joi.object({
    email: Joi.string().required().email().error(errors.login),
    password: Joi.string().required().error(errors.login),
  }),
});

export const profileUpdateValidator = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).error(errors.name),
    about: Joi.string().min(2).max(200).error(errors.about),
  }),
});

export const avatarUpdateValidator = celebrate({
  body: Joi.object({
    avatar: Joi.string().required().regex(URL_REGEXP).error(errors.avatar),
  }),
});

export const cardValidator = celebrate({
  body: Joi.object({
    name: Joi.string().required().min(2).max(30)
      .error(errors.name),
    link: Joi.string().required().regex(URL_REGEXP).error(errors.link),
  }),
});

export const objectIdValidator = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    if (!isValidObjectId(cardId)) {
      throw errors.id;
    }
    next();
  } catch (err) {
    next(err);
  }
};
