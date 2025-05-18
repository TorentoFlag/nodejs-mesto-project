import { CONFLICT_ERROR_STATUS } from '../const';
import HttpError from './HttpError';

class ConflictError extends HttpError {
  constructor(message: string) {
    super(message, CONFLICT_ERROR_STATUS);
  }
}

export default ConflictError;
