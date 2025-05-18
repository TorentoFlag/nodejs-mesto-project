import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import ForbiddenError from '../errors/ForbiddenError';
import UnauthorizedError from '../errors/UnauthorizedError';
import BadRequestError from '../errors/BadRequestError';
import NotFoundError from '../errors/NotFoundError';
import { RequestWithUser } from '../interfaces/RequestWithUser';
import Card from '../models/Card';

export const getAllCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({});
    res.status(200).send({ data: cards });
  } catch (err) {
    next(err);
  }
};

export const createCard = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (!req.body) {
      throw new BadRequestError('Переданые некорректные данные при создании карточки');
    }
    const { name, link } = req.body;
    const _id = req.user?._id;
    const card = new Card({ name, link, owner: _id });
    await card.save();
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }
    res.status(200).send(card);
  } catch (err) {
    if (err instanceof Error && err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      return;
    }
    next(err);
  }
};

export const removeCard = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const { user } = req;
    const userId = user?._id;
    if (!userId) {
      next(new UnauthorizedError('Вы не авторизованы'));
    }
    const { cardId } = req.params;
    if (!isValidObjectId(cardId)) {
      throw new BadRequestError('Переданы некорректные данные при удалении карточки');
    }
    const card = await Card.findById(cardId);
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }
    if (card?.owner.toString() !== userId) {
      throw new ForbiddenError('Нет доступа на удаление этой карточки');
    }
    const deleteCard = await Card.deleteOne({ _id: cardId });
    res.status(200).send(deleteCard);
  } catch (err) {
    next(err);
  }
};

export const likeCard = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id;
    const { cardId } = req.params;
    if (!isValidObjectId(userId) || !isValidObjectId(cardId)) {
      throw new BadRequestError('Переданые некорректные данные для постановки лайка');
    }
    const liked = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );
    if (!liked) {
      throw new BadRequestError('Переданые некорректные данные для постановки лайка');
    }
    res.status(200).send(liked);
  } catch (err) {
    next(err);
  }
};

export const dislikeCard = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id;
    const { cardId } = req.params;
    if (!isValidObjectId(userId) || !isValidObjectId(cardId)) {
      throw new BadRequestError('Переданы некорректные данные для снятия лайка');
    }
    const disliked = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    );
    if (!disliked) {
      throw new BadRequestError('Переданы некорректные данные для снятия лайка');
    }
    res.status(200).send(disliked);
  } catch (err) {
    next(err);
  }
};
