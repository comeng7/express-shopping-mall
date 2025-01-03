import { BaseError } from './base.error';

export class HttpError extends BaseError {
  constructor(statusCode: number, message: string, code?: string) {
    super(statusCode, message, code);
  }
}

export class BadRequestError extends HttpError {
  constructor(message = '잘못된 요청입니다.', code = 'BAD_REQUEST') {
    super(400, message, code);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = '인증이 필요합니다.', code = 'UNAUTHORIZED') {
    super(401, message, code);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = '접근 권한이 없습니다.', code = 'FORBIDDEN') {
    super(403, message, code);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = '리소스를 찾을 수 없습니다.', code = 'NOT_FOUND') {
    super(404, message, code);
  }
}
