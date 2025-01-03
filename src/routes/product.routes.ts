// routes/product.router.ts
import { Router } from 'express';
import { ProductController } from '@/controllers/product.controller';
import { createControllerMiddleware } from '@/middlewares/controller.middleware';

const router = Router();
const useController = createControllerMiddleware(ProductController);

router.get('/products', useController('getProducts'));
router.get('/products/:id', useController('getProduct'));
router.post('/products', useController('createProduct'));

export default router;
