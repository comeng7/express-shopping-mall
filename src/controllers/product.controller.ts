import { Request, Response } from 'express';

export class ProductController {
  // 상품 목록 조회
  public getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      // 임시 데이터
      const products = [
        { id: 1, name: '상품1', price: 1000 },
        { id: 2, name: '상품2', price: 2000 },
      ];

      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: '상품 목록 조회 실패',
      });
    }
  };

  // 상품 상세 조회
  public getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      // 임시 데이터
      const product = {
        id: parseInt(id),
        name: `상품${id}`,
        price: 1000 * parseInt(id),
      };

      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: '상품 상세 조회 실패',
      });
    }
  };
}
