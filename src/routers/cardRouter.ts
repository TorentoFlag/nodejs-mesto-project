import { Router } from 'express';
import { cardValidator, objectIdValidator } from '../middleware/validation';
import {
  createCard,
  dislikeCard,
  getAllCards,
  likeCard,
  removeCard,
} from '../controllers/cards';

const cardRouter = Router();

cardRouter.get('/', getAllCards);
cardRouter.post('/', cardValidator, createCard);
cardRouter.delete('/:cardId', objectIdValidator, removeCard);
cardRouter.put('/:cardId/likes', objectIdValidator, likeCard);
cardRouter.delete('/:cardId/likes', objectIdValidator, dislikeCard);

export default cardRouter;
