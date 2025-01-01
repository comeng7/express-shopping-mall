import { Router } from 'express';
import { ProductController } from '@/controllers/product.controller';

const router = Router();
const productController = new ProductController();

/**
 * @swagger
 * components:
 *   schemas:
 *     productCategory:
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
 *         - imageUrl
 *         - category
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "클래식 토트백"
 *         price:
 *           type: number
 *           example: 259000
 *         imageUrl:
 *           type: string
 *           example: "https://example.com/images/bag1.jpg"
 *         category:
 *           $ref: '#/components/schemas/productCategory'
 *         description:
 *           type: string
 *           example: "클래식한 디자인의 토트백입니다."
 *         isNew:
 *           type: boolean
 *           example: true
 *         isBest:
 *           type: boolean
 *           example: false
 *         viewCount:
 *           type: integer
 *           example: 1200
 *         salesCount:
 *           type: integer
 *           example: 50
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00Z"
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
 *           $ref: '#/components/schemas/productCategory'
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
 *                   name: "클래식 토트백",
 *                   price: 259000,
 *                   imageUrl: "https://example.com/images/bag1.jpg",
 *                   category: "TWIN_BAG",
 *                   description: "클래식한 디자인의 토트백입니다.",
 *                   isNew: true,
 *                   isBest: false,
 *                   viewCount: 1200,
 *                   salesCount: 50,
 *                   createdAt: "2024-01-01T00:00:00Z"
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
 *                   name: "미니멀 크로스백",
 *                   price: 189000,
 *                   imageUrl: "https://example.com/images/bag2.jpg",
 *                   category: "MINIMAL_BAG",
 *                   description: "미니멀한 디자인의 크로스백입니다.",
 *                   isNew: true,
 *                   isBest: false,
 *                   viewCount: 800,
 *                   salesCount: 30,
 *                   createdAt: "2024-01-01T00:00:00Z"
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
 *                   name: "리무드 숄더백",
 *                   price: 299000,
 *                   imageUrl: "https://example.com/images/bag3.jpg",
 *                   category: "REMOOD_BAG",
 *                   description: "인기 많은 숄더백입니다.",
 *                   isNew: false,
 *                   isBest: true,
 *                   viewCount: 2500,
 *                   salesCount: 150,
 *                   createdAt: "2023-12-01T00:00:00Z"
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
 *                 id: 5,
 *                 name: "클로 크로스백",
 *                 price: 229000,
 *                 imageUrl: "https://example.com/images/bag5.jpg",
 *                 category: "CLO_BAG",
 *                 description: "실용적인 디자인의 크로스백입니다.",
 *                 isNew: true,
 *                 isBest: false,
 *                 viewCount: 1000,
 *                 salesCount: 45,
 *                 createdAt: "2024-01-01T00:00:00Z"
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
