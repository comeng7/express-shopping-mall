import { Request, Response } from 'express';
import { Service, Inject } from 'typedi';
import { ProductService } from '@/services/product.service';
import { ZodError } from 'zod';
import { BaseError } from '@/errors';
import { logger } from '@/config/logger.config';
import { createProductSchema } from '@/validators/product.validator';

@Service()
export class ProductController {
  constructor(
    @Inject()
    private readonly productService: ProductService
  ) {}

  /**
   * @swagger
   * /api/products:
   *   get:
   *     summary: 상품 목록 조회
   *     tags:
   *       - Products
   *     parameters:
   *       - in: query
   *         name: category
   *         schema:
   *           type: string
   *         description: 카테고리 코드
   *     responses:
   *       200:
   *         description: 상품 목록 조회 성공
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Product'
   *       500:
   *         description: 서버 에러
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  async getProducts(req: Request, res: Response) {
    try {
      const category = req.query.category as string | undefined;
      const products = await this.productService.getAllProducts(category);
      res.json(products);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        res.status(error.statusCode).json({
          status: 'error',
          code: error.code,
          message: error.message,
        });
      } else {
        logger.error('Unexpected error:', error);
        res.status(500).json({
          status: 'error',
          code: 'INTERNAL_SERVER_ERROR',
          message: '서버 내부 오류가 발생했습니다.',
        });
      }
    }
  }

  /**
   * @swagger
   * /api/products/new:
   *   get:
   *     summary: 신상품 목록 조회
   *     tags:
   *       - Products
   *     responses:
   *       200:
   *         description: 신상품 목록 조회 성공
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Product'
   */
  async getNewProducts(req: Request, res: Response) {
    try {
      const products = await this.productService.getNewProducts();
      res.json(products);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        res.status(error.statusCode).json({
          status: 'error',
          code: error.code,
          message: error.message,
        });
      } else {
        logger.error('Unexpected error:', error);
        res.status(500).json({
          status: 'error',
          code: 'INTERNAL_SERVER_ERROR',
          message: '서버 내부 오류가 발생했습니다.',
        });
      }
    }
  }

  /**
   * @swagger
   * /api/products/best:
   *   get:
   *     summary: 베스트상품 목록 조회
   *     tags:
   *       - Products
   *     responses:
   *       200:
   *         description: 베스트상품 목록 조회 성공
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Product'
   */
  async getBestProducts(req: Request, res: Response) {
    try {
      const products = await this.productService.getBestProducts();
      res.json(products);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        res.status(error.statusCode).json({
          status: 'error',
          code: error.code,
          message: error.message,
        });
      } else {
        logger.error('Unexpected error:', error);
        res.status(500).json({
          status: 'error',
          code: 'INTERNAL_SERVER_ERROR',
          message: '서버 내부 오류가 발생했습니다.',
        });
      }
    }
  }

  /**
   * @swagger
   * /api/products/{id}:
   *   get:
   *     summary: 특정 상품 조회
   *     tags:
   *       - Products
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: 상품 ID
   *     responses:
   *       200:
   *         description: 상품 조회 성공
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   *       404:
   *         description: 상품을 찾을 수 없음
   */
  async getProductById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          status: 'error',
          code: 'INVALID_ID',
          message: '유효하지 않은 상품 ID입니다.',
        });
        return;
      }

      const product = await this.productService.getProductById(id);
      if (!product) {
        res.status(404).json({
          status: 'error',
          code: 'NOT_FOUND',
          message: '상품을 찾을 수 없습니다.',
        });
        return;
      }

      res.json(product);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        res.status(error.statusCode).json({
          status: 'error',
          code: error.code,
          message: error.message,
        });
      } else {
        logger.error('Unexpected error:', error);
        res.status(500).json({
          status: 'error',
          code: 'INTERNAL_SERVER_ERROR',
          message: '서버 내부 오류가 발생했습니다.',
        });
      }
    }
  }

  /**
   * @swagger
   * /api/products:
   *   post:
   *     summary: 상품 생성
   *     tags:
   *       - Products
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateProductDto'
   *     responses:
   *       201:
   *         description: 상품 생성 성공
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   *       400:
   *         description: 잘못된 입력
   */
  async createProduct(req: Request, res: Response) {
    try {
      const validatedData = createProductSchema.parse(req.body);
      const product = await this.productService.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        res.status(400).json({
          status: 'error',
          code: 'VALIDATION_ERROR',
          errors: error.errors,
        });
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).json({
          status: 'error',
          code: error.code,
          message: error.message,
        });
      } else {
        logger.error('Unexpected error:', error);
        res.status(500).json({
          status: 'error',
          code: 'INTERNAL_SERVER_ERROR',
          message: '서버 내부 오류가 발생했습니다.',
        });
      }
    }
  }
}
