// cart.controller.ts
import { Request, Response } from 'express';
import { Service, Inject } from 'typedi';

import { logger } from '@/config/logger.config';
import { BaseError } from '@/errors';
import { CartService } from '@/services/cart.service';

@Service()
export class CartController {
  constructor(@Inject() private cartService: CartService) {}
  /**
   * @swagger
   * /api/carts:
   *   get:
   *     summary: 회원 장바구니 조회
   *     tags:
   *       - 장바구니
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: 장바구니 조회 성공
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/CartListResponse'
   *       4xx:
   *         $ref: '#/components/responses/Error'
   */
  async getCartByUserNo(req: Request, res: Response) {
    try {
      // auth 미들웨어에서 할당한 req.user
      const userNo = req.user?.userNo;

      if (!userNo) {
        return res.status(401).json({
          status: 'error',
          code: 'UNAUTHORIZED',
          message: '로그인이 필요합니다.',
        });
      }

      const cart = await this.cartService.getCart(userNo);
      return res.json(cart);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).json({
          status: 'error',
          code: error.code,
          message: error.message,
        });
      }
      logger.error('Unexpected error:', error);
      return res.status(500).json({
        status: 'error',
        code: 'INTERNAL_SERVER_ERROR',
        message: '서버 내부 오류가 발생했습니다.',
      });
    }
  }

  /**
   * @swagger
   * /api/carts:
   *   post:
   *     summary: 장바구니 상품 추가
   *     tags:
   *       - 장바구니
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: query
   *         name: productId
   *         required: true
   *         schema:
   *           type: integer
   *         description: 상품 ID
   *       - in: query
   *         name: quantity
   *         schema:
   *           type: integer
   *         description: 수량
   *     responses:
   *       200:
   *         description: 장바구니 추가 성공
   *         $ref: '#/components/responses/Success'
   *       4xx:
   *         $ref: '#/components/responses/Error'
   */
  async addItem(req: Request, res: Response) {
    try {
      // auth 미들웨어에서 할당한 req.user
      const userNo = req.user?.userNo;

      if (!userNo) {
        return res.status(401).json({
          status: 'error',
          code: 'UNAUTHORIZED',
          message: '로그인이 필요합니다.',
        });
      }

      const { productId, quantity } = req.query;
      if (!productId) {
        return res.status(400).json({
          status: 'error',
          code: 'INVALID_INPUT',
          message: 'productId는 필수 값입니다.',
        });
      }

      const result = await this.cartService.addItem(
        userNo,
        Number(productId),
        Number(quantity || 1),
      );
      return res.json(result);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).json({
          status: 'error',
          code: error.code,
          message: error.message,
        });
      }
      logger.error('Unexpected error:', error);
      return res.status(500).json({
        status: 'error',
        code: 'INTERNAL_SERVER_ERROR',
        message: '서버 내부 오류가 발생했습니다.',
      });
    }
  }

  /**
   * @swagger
   * /api/carts/{productId}:
   *   delete:
   *     summary: 장바구니 상품 삭제
   *     tags:
   *       - 장바구니
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: productId
   *         required: true
   *         schema:
   *           type: integer
   *         description: 상품 ID
   *     responses:
   *       200:
   *         description: 장바구니 삭제 성공
   *         $ref: '#/components/responses/Success'
   *       4xx:
   *         $ref: '#/components/responses/Error'
   */
  async removeItem(req: Request, res: Response) {
    try {
      // auth 미들웨어에서 할당한 req.user
      const userNo = req.user?.userNo;

      if (!userNo) {
        return res.status(401).json({
          status: 'error',
          code: 'UNAUTHORIZED',
          message: '로그인이 필요합니다.',
        });
      }

      const productId = Number(req.params.productId);

      if (!productId) {
        return res.status(400).json({
          status: 'error',
          code: 'INVALID_INPUT',
          message: '유효하지 않은 상품 ID입니다.',
        });
      }

      const result = await this.cartService.removeItem(userNo, productId);
      return res.json(result);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).json({
          status: 'error',
          code: error.code,
          message: error.message,
        });
      }
      logger.error('Unexpected error:', error);
      return res.status(500).json({
        status: 'error',
        code: 'INTERNAL_SERVER_ERROR',
        message: '서버 내부 오류가 발생했습니다.',
      });
    }
  }
}
