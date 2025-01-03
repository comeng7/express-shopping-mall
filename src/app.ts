import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { commonMiddleware } from './middlewares/common.middleware';
import { requestLogger } from './middlewares/logger.middleware';
import { errorHandler } from './middlewares/error.middleware';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from './config/swagger.config';
import productRouter from './routes/product.routes';
import { AppDataSource } from './config/typeorm.config';
import { logger } from './config/logger.config';

const app = express();

// 공통 미들웨어 적용
app.use(commonMiddleware);

// 로깅 미들웨어
app.use(requestLogger);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

// 라우터
app.use('/api/products', productRouter);

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

// DB 연결 및 서버 시작
AppDataSource.initialize()
  .then(() => {
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
