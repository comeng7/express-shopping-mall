import { BaseError } from '@/errors/base.error';

export class BusinessError extends BaseError {
  constructor(message: string, code = 'BUSINESS_ERROR') {
    super(400, message, code);
  }
}

export class ProductError extends BusinessError {
  static NotFound = (id: number) => new BusinessError(`상품(${id})을 찾을 수 없습니다.`, 'PRODUCT_NOT_FOUND');

  static InvalidPrice = () => new BusinessError('상품 가격이 유효하지 않습니다.', 'INVALID_PRODUCT_PRICE');

  static OutOfStock = (id: number) => new BusinessError(`상품(${id})의 재고가 부족합니다.`, 'PRODUCT_OUT_OF_STOCK');
}

export class CategoryError extends BusinessError {
  static NotFound = (id: number) => new BusinessError(`카테고리(${id})를 찾을 수 없습니다.`, 'CATEGORY_NOT_FOUND');
}
