import { model, Schema } from 'mongoose';
import { ICard } from '../interfaces/ICard';

const cardSchema = new Schema({
  name:
  {
    type: String, required: true, minLength: 2, maxLength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(value: string) {
        return /^(https?:\/\/)?([\w\d-]+\.)+[\w]{2,}(\/[\w\d\-./?%&=]*)?$/.test(value);
      },
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
