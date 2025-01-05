import { Inject, Service } from 'typedi';
import { ProductRepository } from '@/repositories/product.repository';
import { logger } from '@/config/logger.config';
import { ProductError, DatabaseError } from '@/errors';
import { Product } from '@/entities/Product.entity';
import { TProductListResponse, TProductResponse } from '@/types/product.types';
import { createProductSchema, TCreateProductDto } from '@/validators/product.validator';
import { IProductService } from '@/interfaces/product.interface';

@Service()
export class ProductService implements IProductService {
  constructor(@Inject() private productRepository: ProductRepository) {}

  private getFilteredProduct(product: Product) {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category.name,
      isNew: product.isNew,
      isBest: product.isBest,
      color: product.color,
      description: product.description,
    };
  }

  async getAllProducts(category?: string): Promise<TProductListResponse> {
    try {
      const products = await this.productRepository.findAll(category);

      return {
        data: products.map(this.getFilteredProduct),
      };
    } catch (error: unknown) {
      logger.error('Failed to fetch products:', error);
      throw DatabaseError.Query('상품 목록 조회 실패');
    }
  }

  async getNewProducts(): Promise<TProductListResponse> {
    try {
      const products = await this.productRepository.findNew();

      return {
        data: products.map(this.getFilteredProduct),
      };
    } catch (error: unknown) {
      logger.error('Failed to fetch new products:', error);
      throw DatabaseError.Query('새로운 상품 목록 조회 실패');
    }
  }

  async getBestProducts(): Promise<TProductListResponse> {
    try {
      const products = await this.productRepository.findBest();

      return {
        data: products.map(this.getFilteredProduct),
      };
    } catch (error: unknown) {
      logger.error('Failed to fetch best products:', error);
      throw DatabaseError.Query('베스트 상품 목록 조회 실패');
    }
  }

  async getProductById(id: number): Promise<TProductResponse | null> {
    try {
      const product = await this.productRepository.findById(id);
      if (!product) {
        throw ProductError.NotFound(id);
      }
      return this.getFilteredProduct(product);
    } catch (error: unknown) {
      if (error instanceof ProductError) {
        throw error;
      }
      logger.error(`Failed to fetch product ${id}:`, error);
      throw DatabaseError.Query('상품 조회 실패');
    }
  }

  async createProduct(data: TCreateProductDto) {
    try {
      const validatedData = createProductSchema.parse(data);
      return await this.productRepository.create(validatedData);
    } catch (error: unknown) {
      logger.error('Failed to create product:', error);
      if (error instanceof ProductError) {
        throw error;
      }
      throw DatabaseError.Query('상품 생성 실패');
    }
  }
}
