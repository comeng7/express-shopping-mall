import { Router } from 'express';
import { ProductController } from '@/controllers/product.controller';

const router = Router();
const productController = new ProductController();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: 상품 목록 조회
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: 상품 목록 조회 성공
 */
router.get('/', productController.getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: 상품 상세 조회
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 상품 상세 조회 성공
 */
router.get('/:id', productController.getProductById);

export default router;
