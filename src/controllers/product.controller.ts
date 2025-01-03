import { Request, Response } from 'express';
import { Service, Inject } from 'typedi';
import { ProductService } from '@/services/product.service';
import { createProductSchema } from '@/types/product.types';
import { ZodError } from 'zod';
import { BaseError } from '@/errors';
import { logger } from '@/config/logger.config';

@Service()
export class ProductController {
  constructor(
    @Inject()
    private readonly productService: ProductService
  ) {}
  /**
   * @openapi
   * /products:
   *   get:
   *     summary: 모든 상품 조회
   *     tags:
   *       - Products
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
      const products = await this.productService.getProducts();
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
   * @openapi
   * /products/{id}:
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
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  async getProduct(req: Request, res: Response) {
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

      const product = await this.productService.getProduct(id);
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
   * @openapi
   * /products:
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
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
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
