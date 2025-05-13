import { BAD_REQUEST_ERROR_STATUS } from '../const';
import HttpError from './HttpError';

class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, BAD_REQUEST_ERROR_STATUS);
  }
}

export default BadRequestError;
