import { Inject, Service } from 'typedi';
import { DataSource, Repository } from 'typeorm';

import { Cart } from '@/entities/Cart.entity';
import { CartItem } from '@/entities/CartItem.entity';

@Service()
export class CartRepository {
  private cartRepo: Repository<Cart>;
  private cartItemRepo: Repository<CartItem>;

  constructor(@Inject() private dataSource: DataSource) {
    this.cartRepo = dataSource.getRepository(Cart);
    this.cartItemRepo = dataSource.getRepository(CartItem);
  }

  // 회원 장바구니 조회
  async findAllByUserNo(userNo: number) {
    return this.cartRepo
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.cartItems', 'ci')
      .leftJoinAndSelect('ci.product', 'p')
      .where('c.userId = :userNo', { userId: userNo })
      .getOne();
  }

  // 장바구니에 상품 추가
  async addItem(userNo: number, productId: number, quantity: number) {
    let cart = await this.cartRepo
      .createQueryBuilder('c')
      .where('c.userId = :userNo', { userId: userNo })
      .getOne();

    // 회원의 장바구니가 없으면 생성
    if (!cart) {
      cart = this.cartRepo.create({ userId: userNo });
      await this.cartRepo.save(cart);
    }

    // 해당 상품이 장바구니에 이미 있는지 확인
    const existingItem = await this.cartItemRepo
      .createQueryBuilder('ci')
      .where('ci.cartId = :cartId AND ci.productId = :productId', {
        cartId: cart.id,
        productId,
      })
      .getOne();

    if (existingItem) {
      // 이미 존재하는 상품인 경우 수량만 증가
      existingItem.quantity += quantity;
      return this.cartItemRepo.save(existingItem);
    }

    // 새로운 아이템 등록
    const newItem = this.cartItemRepo.create({
      cartId: cart.id,
      productId,
      quantity,
    });
    return this.cartItemRepo.save(newItem);
  }

  // 장바구니에서 상품 삭제
  async removeItem(userNo: number, cartItemId: number) {
    const cart = await this.cartRepo
      .createQueryBuilder('c')
      .where('c.userId = :userNo', { userId: userNo })
      .getOne();

    if (!cart) {
      return;
    }

    // cartItem이 현재 사용자의 장바구니에 속해있는지 확인 후 삭제
    await this.cartItemRepo
      .createQueryBuilder()
      .delete()
      .where('id = :cartItemId AND cartId = :cartId', {
        cartItemId,
        cartId: cart.id,
      })
      .execute();
  }
}
