import { model, Schema } from 'mongoose';
import isUrl from 'validator/lib/isURL';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/IUser';

const userSchema = new Schema({
  name: {
    type: String, required: false, minLength: 2, maxLength: 30, default: 'Жак-Ив Кусто',
  },
  about: {
    type: String, required: false, minLength: 3, maxLength: 200, default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(value: string) {
        return isUrl(value);
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value: string) {
        return isEmail(value);
      },
    },
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function preSave(next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  return next();
});

userSchema.methods.comparePassword = async function comparePassword(
  incomingPass: string,
): Promise<boolean> {
  return bcrypt.compare(incomingPass, this.password);
};

export default model<IUser>('user', userSchema);
