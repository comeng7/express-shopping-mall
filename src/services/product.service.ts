import { Service } from 'typedi';
import { ProductRepository } from '@/repositories/product.repository';
import { CreateProductDto, UpdateProductDto, createProductSchema } from '@/types/product.types';
import { logger } from '@/config/logger.config';
import { ProductError, DatabaseError } from '@/errors';
import { Product } from '@/entities/Product.entity';

@Service()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProducts(): Promise<Product[]> {
    try {
      return await this.productRepository.findAll();
    } catch (error: unknown) {
      logger.error('Failed to fetch products:', error);
      throw DatabaseError.Query('상품 목록 조회 실패');
    }
  }

  async getProduct(id: number) {
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

  async updateProduct(id: number, data: UpdateProductDto) {
    try {
      const product = await this.productRepository.findById(id);
      if (!product) {
        throw ProductError.NotFound(id);
      }
      return await this.productRepository.update(id, data);
    } catch (error: unknown) {
      if (error instanceof ProductError) {
        throw error;
      }
      logger.error(`Failed to update product ${id}:`, error);
      throw DatabaseError.Query('상품 수정 실패');
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      const product = await this.productRepository.findById(id);
      if (!product) {
        throw ProductError.NotFound(id);
      }
      await this.productRepository.delete(id);
    } catch (error: unknown) {
      if (error instanceof ProductError) {
        throw error;
      }
      logger.error(`Failed to delete product ${id}:`, error);
      throw DatabaseError.Query('상품 삭제 실패');
    }
  }
}
