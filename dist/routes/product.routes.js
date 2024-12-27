"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("@/controllers/product.controller");
const router = (0, express_1.Router)();
const productController = new product_controller_1.ProductController();
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
exports.default = router;
