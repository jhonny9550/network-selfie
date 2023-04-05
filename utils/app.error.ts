export default class AppError extends Error {
  public statusCode: number;
  public statusMessage: string;
  public data?: any;
  public errors?: any;

  constructor(
    statusMessage: string,
    statusCode: number,
    data?: any,
    errors?: any
  ) {
    super(statusMessage);

    this.statusCode = statusCode;
    this.data = data;
    this.statusMessage = statusMessage;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}
