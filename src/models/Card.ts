import { model, Schema } from 'mongoose';
import { ICard } from '../interfaces/ICard';

const cardSchema = new Schema({
  name:
  {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minLength: [2, 'Минимальная длина поля "name" - 2'],
    maxLength: [30, 'Максимальная длина поля "name" - 30'],
  },
  link: {
    type: String,
    required: [true, 'Поле "link" должно быть заполнено'],
    validate: {
      validator(value: string) {
        return /^(https?:\/\/)?([\w\d-]+\.)+[\w]{2,}(\/[\w\d\-./?%&=]*)?$/.test(value);
      },
      message: 'Поле "link" должно быть валидным',
    },
  },
  owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: { type: Schema.Types.Date, default: Date.now() },
});

export default model<ICard>('card', cardSchema);
