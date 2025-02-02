import { Inject, Service } from 'typedi';

import { logger } from '@/config/logger.config';
import { DatabaseError } from '@/errors';
import { CartRepository } from '@/repositories/cart.repository';

@Service()
export class CartService {
  constructor(@Inject() private cartRepository: CartRepository) {}

  // 회원 전체 장바구니 조회
  async getCart(userNo: number) {
    try {
      const cart = await this.cartRepository.findAllByUserNo(userNo);
      return {
        data: cart ?? {},
      };
    } catch (error: unknown) {
      logger.error(`Failed to fetch cart for user ${userNo}:`, error);
      throw DatabaseError.Query('장바구니 조회 실패');
    }
  }

  // 장바구니 상품 추가
  async addItem(userNo: number, productId: number, quantity: number) {
    try {
      return this.cartRepository.addItem(userNo, productId, quantity);
    } catch (error: unknown) {
      logger.error(`Failed to add item for user ${userNo}`, error);
      throw DatabaseError.Query('장바구니 추가 실패');
    }
  }

  // 장바구니 상품 삭제
  async removeItem(userNo: number, itemId: number) {
    try {
      return this.cartRepository.removeItem(userNo, itemId);
    } catch (error: unknown) {
      logger.error(`Failed to remove item ${itemId} for user ${userNo}`, error);
      throw DatabaseError.Query('장바구니 삭제 실패');
    }
  }
}
