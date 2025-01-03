import { Request, Response, NextFunction } from 'express';
import { BaseError } from '@/errors';
import { logger } from '@/config/logger.config';
import { ZodError } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      code: 'VALIDATION_ERROR',
      errors: error.errors,
    });
  }

  if (error instanceof BaseError) {
    return res.status(error.statusCode).json({
      status: 'error',
      code: error.code,
      message: error.message,
    });
  }

  logger.error('Unexpected error:', error);
  return res.status(500).json({ error: error.message });
};
