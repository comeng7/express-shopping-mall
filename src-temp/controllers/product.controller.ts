import { Request, Response, NextFunction } from 'express';
import { ProductService } from '@/services/products.service';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

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
  public getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { category } = req.query;
      const products = await this.productService.getAllProducts(category as string);
      this.sendResponse(res, products);
    } catch (error) {
      next(error);
    }
  };

  // 신상품 조회
  public getNewProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productService.getNewProducts();
      this.sendResponse(res, products);
    } catch (error) {
      next(error);
    }
  };

  // 베스트 상품 조회
  public getBestProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productService.getBestProducts();
      this.sendResponse(res, products);
    } catch (error) {
      next(error);
    }
  };

  // 상품 상세 정보 조회
  public getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(parseInt(id));

      if (!product) {
        return this.handleError(res, '상품을 찾을 수 없습니다.');
      }

      this.sendResponse(res, product);
    } catch (error) {
      next(error);
    }
  };
}
