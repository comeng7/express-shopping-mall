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
   *       4xx:
   *         $ref: '#/components/responses/Error'
   */
  async getCartByUserId(req: Request, res: Response) {
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
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - userId
   *               - productId
   *               - quantity
   *             properties:
   *               userId:
   *                 type: integer
   *                 example: 1
   *               productId:
   *                 type: integer
   *                 example: 10
   *               quantity:
   *                 type: integer
   *                 example: 2
   *     responses:
   *       200:
   *         description: 장바구니 추가 성공
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

      const { productId, quantity } = req.body;
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
   * /api/carts/{itemId}:
   *   delete:
   *     summary: 장바구니 상품 삭제
   *     tags:
   *       - 장바구니
   *     parameters:
   *       - in: query
   *         name: userId
   *         required: true
   *         schema:
   *           type: integer
   *         description: 회원 ID
   *       - in: path
   *         name: itemId
   *         required: true
   *         schema:
   *           type: integer
   *         description: 장바구니 아이템 ID
   *     responses:
   *       200:
   *         description: 장바구니 삭제 성공
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

      const itemId = Number(req.params.itemId);

      if (!itemId) {
        return res.status(400).json({
          status: 'error',
          code: 'INVALID_INPUT',
          message: '유효하지 않은 장바구니 아이템 ID입니다.',
        });
      }

      await this.cartService.removeItem(userNo, itemId);
      return res.json({ message: 'Item removed from cart' });
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
