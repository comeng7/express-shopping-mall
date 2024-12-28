import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { specs } from '@/config/swagger';
import productRouter from '@/routes/product.routes';

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/products', productRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log(process.env.DB_USER);
