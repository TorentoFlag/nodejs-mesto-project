import { NOT_FOUND_ERROR_STATUS } from '../const';
import HttpError from './HttpError';

class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, NOT_FOUND_ERROR_STATUS);
  }
}

export default NotFoundError;
