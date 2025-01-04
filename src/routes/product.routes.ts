import { Router } from 'express';
import { ProductController } from '@/controllers/product.controller';
import { createControllerMiddleware } from '@/middlewares/controller.middleware';

const router = Router();
const useController = createControllerMiddleware(ProductController);

router.get('/', useController('getProducts'));
router.get('/new', useController('getNewProducts'));
router.get('/best', useController('getBestProducts'));
router.get('/:id', useController('getProductById'));
router.post('/', useController('createProduct'));

export default router;
