import { Router } from 'express';

import { CartController } from '@/controllers/cart.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { createControllerMiddleware } from '@/middlewares/controller.middleware';

const router = Router();
const useController = createControllerMiddleware(CartController);

// 회원 전체 장바구니 조회
router.get('/', authMiddleware, useController('getCartByUserNo'));

// 장바구니에 상품 추가
router.post('/', authMiddleware, useController('addItem'));

// 장바구니에서 상품 삭제
router.delete('/:productId', authMiddleware, useController('removeItem'));

export default router;
