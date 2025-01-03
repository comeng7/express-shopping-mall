import express from 'express';
import { commonMiddleware } from './middlewares/common.middleware';
import { requestLogger } from './middlewares/logger.middleware';
import { errorHandler } from './middlewares/error.middleware';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import productRouter from './routes/product.routes';

const app = express();

// 공통 미들웨어 적용
app.use(commonMiddleware);

// 로깅 미들웨어
app.use(requestLogger);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// 라우터
app.use('/products', productRouter);

// 에러 핸들링 미들웨어
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
