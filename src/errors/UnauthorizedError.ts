import { UNAUTHORIZED_ERROR_STATUS } from '../const';
import HttpError from './HttpError';

class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(message, UNAUTHORIZED_ERROR_STATUS);
  }
}

export default UnauthorizedError;
