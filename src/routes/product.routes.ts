import { Router } from 'express';
import { Container } from 'typedi';
import { ProductController } from '@/controllers/product.controller';

const router = Router();
const productController = Container.get(ProductController);

router.get('/products', (req, res) => productController.getProducts.bind(productController)(req, res));
router.get('/products/:id', (req, res) => productController.getProduct.bind(productController)(req, res));
router.post('/products', (req, res) => productController.createProduct.bind(productController)(req, res));

export default router;
