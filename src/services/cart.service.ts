import { Inject, Service } from 'typedi';

import { logger } from '@/config/logger.config';
import { DatabaseError } from '@/errors';
import { CartRepository } from '@/repositories/cart.repository';

@Service()
export class CartService {
  constructor(@Inject() private cartRepository: CartRepository) {}

  // 회원 장바구니 목록 조회
  async getCart(userNo: number) {
    try {
      const cartItems =
        await this.cartRepository.findAllCartItemsByUserNo(userNo);

      return {
        data: (cartItems || []).map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          createdAt: item.createdAt,
          productName: item.product.name,
          productImageUrl: item.product.imageUrl,
          productColor: item.product.color,
          productPrice: item.product.price,
        })),
      };
    } catch (error: unknown) {
      logger.error(`Failed to fetch cart for user ${userNo}:`, error);
      throw DatabaseError.Query('장바구니 조회 실패');
    }
  }

  // 장바구니 상품 추가
  async addItem(userNo: number, productId: number, quantity: number) {
    try {
      await this.cartRepository.addCartItem(userNo, productId, quantity);

      return {
        result: true,
      };
    } catch (error: unknown) {
      logger.error(`Failed to add item for user ${userNo}`, error);
      throw DatabaseError.Query('장바구니 추가 실패');
    }
  }

  // 장바구니 상품 삭제
  async removeItem(userNo: number, itemId: number) {
    try {
      await this.cartRepository.removeCartItem(userNo, itemId);

      return {
        result: true,
      };
    } catch (error: unknown) {
      logger.error(`Failed to remove item ${itemId} for user ${userNo}`, error);
      throw DatabaseError.Query('장바구니 삭제 실패');
    }
  }
}
