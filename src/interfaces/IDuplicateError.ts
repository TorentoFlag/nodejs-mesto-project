import { MongoServerError } from 'mongodb';
import { MongooseError } from 'mongoose';

export interface IDuplicateError extends MongooseError {
  cause?: MongoServerError & {
    code: number;
  }
}
