import IHttpError from '../interfaces/IError';

class HttpError extends Error implements IHttpError {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export default HttpError;
