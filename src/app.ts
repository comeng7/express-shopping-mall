import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { Container } from 'typedi';
import { DataSource } from 'typeorm';

import { logger } from '@/config/logger.config';
import { specs } from '@/config/swagger.config';
import { AppDataSource } from '@/config/typeorm.config';
import { commonMiddleware } from '@/middlewares/common.middleware';
import { errorHandler } from '@/middlewares/error.middleware';
import { requestLogger } from '@/middlewares/logger.middleware';
import productRouter from '@/routes/product.routes';
import userRouter from '@/routes/user.routes';

const app = express();

// 공통 미들웨어 적용
app.use(commonMiddleware);

// 로깅 미들웨어
app.use(requestLogger);

// Swagger
app.use(
  '/api-docs',
  (req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Cross-Origin-Opener-Policy', 'same-origin');
    res.header('Cross-Origin-Embedder-Policy', 'unsafe-none');
    next();
  },
  swaggerUi.serve,
  swaggerUi.setup(specs),
);

// DB 연결 및 서버 시작
AppDataSource.initialize()
  .then(() => {
    // DataSource 초기화 후 Container에 등록
    Container.set(DataSource, AppDataSource);

    // 라우터 설정
    app.use('/api/products', productRouter);
    app.use('/api/users', userRouter);

    // 에러 핸들링 미들웨어
    app.use(errorHandler);

    // 404 처리
    app.use((req: Request, res: Response) => {
      res.status(404).json({
        status: 'error',
        code: 'NOT_FOUND',
        message: '요청한 리소스를 찾을 수 없습니다.',
      });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      logger.info(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error: unknown) => {
    if (error instanceof Error) {
      logger.error('Server initialization failed:', error.message);
    } else {
      logger.error('Unknown server error:', error);
    }
    process.exit(1);
  });

export default app;
