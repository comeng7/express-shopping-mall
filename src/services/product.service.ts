import { Inject, Service } from 'typedi';
import { ProductRepository } from '@/repositories/product.repository';
import { logger } from '@/config/logger.config';
import { ProductError, DatabaseError } from '@/errors';
import { Product } from '@/entities/Product.entity';
import { CreateProductDto } from '@/types/product.types';
import { createProductSchema } from '@/validators/product.validator';

@Service()
export class ProductService {
  constructor(@Inject() private productRepository: ProductRepository) {}

  async getAllProducts(category?: string): Promise<Product[]> {
    try {
      return await this.productRepository.findAll(category);
    } catch (error: unknown) {
      logger.error('Failed to fetch products:', error);
      throw DatabaseError.Query('상품 목록 조회 실패');
    }
  }

  async getNewProducts(): Promise<Product[]> {
    try {
      return await this.productRepository.findNew();
    } catch (error: unknown) {
      logger.error('Failed to fetch new products:', error);
      throw DatabaseError.Query('새로운 상품 목록 조회 실패');
    }
  }

  async getBestProducts(): Promise<Product[]> {
    try {
      return await this.productRepository.findBest();
    } catch (error: unknown) {
      logger.error('Failed to fetch best products:', error);
      throw DatabaseError.Query('베스트 상품 목록 조회 실패');
    }
  }

  async getProductById(id: number): Promise<Product | null> {
    try {
      const product = await this.productRepository.findById(id);
      if (!product) {
        throw ProductError.NotFound(id);
      }
      return product;
    } catch (error: unknown) {
      if (error instanceof ProductError) {
        throw error;
      }
      logger.error(`Failed to fetch product ${id}:`, error);
      throw DatabaseError.Query('상품 조회 실패');
    }
  }

  async createProduct(data: CreateProductDto) {
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
