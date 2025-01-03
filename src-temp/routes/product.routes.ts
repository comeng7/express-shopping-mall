import { Router } from 'express';
import { ProductController } from '@/controllers/product.controller';

const router = Router();
const productController = new ProductController();

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductCategory:
 *       type: string
 *       enum: [TWIN_BAG, REMOOD_BAG, CLO_BAG, MINIMAL_BAG, ACCESSORY]
 *     ProductResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - price
 *         - image_url
 *         - category_name
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "FUR Large"
 *         price:
 *           type: number
 *           example: 95000
 *         image_url:
 *           type: string
 *           example: "https://shopping-mall-images.s3.ap-northeast-2.amazonaws.com/products/allitems1.jpg"
 *         category_name:
 *           type: string
 *           example: "TWIN BAG"
 *         description:
 *           type: string
 *           example: "Limited Edition Twin Bag"
 *         color:
 *           type: string
 *           example: "shakerato (LIMITED)"
 *         is_new:
 *           type: boolean
 *           example: true
 *         is_best:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: 전체 상품 목록 조회 (카테고리 필터링 가능)
 *     tags: [상품]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           $ref: '#/components/schemas/ProductCategory'
 *         required: false
 *         description: 선택적 카테고리 필터 (미입력시 전체 카테고리 조회)
 *     responses:
 *       200:
 *         description: 상품 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *             example:
 *               data: [
 *                 {
 *                   id: 1,
 *                   name: "FUR Large",
 *                   price: 95000,
 *                   image_url: "https://shopping-mall-images.s3.ap-northeast-2.amazonaws.com/products/allitems1.jpg",
 *                   category_name: "TWIN BAG",
 *                   description: "Limited Edition Twin Bag",
 *                   color: "shakerato (LIMITED)",
 *                   is_new: true,
 *                   is_best: true
 *                 }
 *               ]
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /products/new:
 *   get:
 *     summary: 신상품 목록 조회
 *     tags: [상품]
 *     responses:
 *       200:
 *         description: 신상품 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *             example:
 *               data: [
 *                 {
 *                   id: 2,
 *                   name: "FUR",
 *                   price: 160000,
 *                   image_url: "https://shopping-mall-images.s3.ap-northeast-2.amazonaws.com/products/allitems2.jpg",
 *                   category_name: "TWIN BAG",
 *                   description: "Classic Twin Bag Design",
 *                   color: "shakerato",
 *                   is_new: true,
 *                   is_best: false
 *                 }
 *               ]
 */
router.get('/new', productController.getNewProducts);

/**
 * @swagger
 * /products/best:
 *   get:
 *     summary: 베스트 상품 목록 조회
 *     tags: [상품]
 *     responses:
 *       200:
 *         description: 베스트 상품 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *             example:
 *               data: [
 *                 {
 *                   id: 3,
 *                   name: "tobo L",
 *                   price: 360000,
 *                   image_url: "https://shopping-mall-images.s3.ap-northeast-2.amazonaws.com/products/allitems3.jpg",
 *                   category_name: "MINIMAL BAG",
 *                   description: "Premium Minimal Design",
 *                   color: "sand",
 *                   is_new: false,
 *                   is_best: true
 *                 }
 *               ]
 */
router.get('/best', productController.getBestProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: 상품 상세 정보 조회
 *     tags: [상품]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 상품 ID
 *     responses:
 *       200:
 *         description: 상품 상세 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *             example:
 *               data: {
 *                 id: 4,
 *                 name: "tobo L",
 *                 price: 360000,
 *                 image_url: "https://shopping-mall-images.s3.ap-northeast-2.amazonaws.com/products/allitems4.jpg",
 *                 category_name: "MINIMAL BAG",
 *                 description: "Premium Minimal Design",
 *                 color: "brick",
 *                 is_new: false,
 *                 is_best: true
 *               }
 *       404:
 *         description: 상품을 찾을 수 없음
 *         content:
 *           application/json:
 *             example:
 *               message: "상품을 찾을 수 없습니다."
 */
router.get('/:id', productController.getProductById);

export default router;
