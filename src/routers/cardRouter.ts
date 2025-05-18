import { Router } from 'express';
import { cardValidator } from '../middleware/validation';
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
cardRouter.delete('/:cardId', removeCard);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', dislikeCard);

export default cardRouter;
