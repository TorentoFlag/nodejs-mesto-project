import { FORBIDDEN_ERROR_STATUS } from '../const';
import HttpError from './HttpError';

class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(message, FORBIDDEN_ERROR_STATUS);
  }
}

export default ForbiddenError;
