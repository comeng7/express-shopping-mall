import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

import { logger } from '@/config/logger.config';
import { BaseError } from '@/errors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      status: 'error',
      code: 'VALIDATION_ERROR',
      errors: error.errors,
    });
  }

  if (error instanceof BaseError) {
    res.status(error.statusCode).json({
      status: 'error',
      code: error.code,
      message: error.message,
    });
  }

  logger.error('Unexpected error:', error);
  res.status(500).json({
    status: 'error',
    code: 'INTERNAL_SERVER_ERROR',
    message: '서버 내부 오류가 발생했습니다.',
  });
};
