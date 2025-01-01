import { Request, Response, NextFunction } from 'express';
import { products } from '@/mocks/products';

export class ProductController {
  // 공통 응답 포맷 메서드
  private sendResponse = (res: Response, data: unknown) => {
    res.json({
      data,
    });
  };

  // 공통 에러 처리 메서드
  private handleError = (res: Response, message: string, status = 404) => {
    res.status(status).json({
      message,
    });
  };

  // 전체 상품 목록 조회 (카테고리 필터링 가능)
  public getAllProducts = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { category } = req.query;

      const filteredProducts = category ? products.filter((product) => product.category === category) : products;

      this.sendResponse(res, filteredProducts);
    } catch (error) {
      next(error);
    }
  };

  // 신상품 조회
  public getNewProducts = (req: Request, res: Response, next: NextFunction) => {
    try {
      const newProducts = products.filter((product) => product.isNew);
      this.sendResponse(res, newProducts);
    } catch (error) {
      next(error);
    }
  };

  // 베스트 상품 조회
  public getBestProducts = (req: Request, res: Response, next: NextFunction) => {
    try {
      const bestProducts = products.filter((product) => product.isBest);
      this.sendResponse(res, bestProducts);
    } catch (error) {
      next(error);
    }
  };

  // 상품 상세 정보 조회
  public getProductById = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = products.find((p) => p.id === parseInt(id));

      if (!product) {
        return this.handleError(res, '상품을 찾을 수 없습니다.');
      }

      this.sendResponse(res, product);
    } catch (error) {
      next(error);
    }
  };
}
