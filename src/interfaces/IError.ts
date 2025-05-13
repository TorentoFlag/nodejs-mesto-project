interface IHttpError extends Error {
  status: number;
  message: string;
}

export default IHttpError;
