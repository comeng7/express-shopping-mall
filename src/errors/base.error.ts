export class BaseError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
