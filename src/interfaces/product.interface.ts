import { Product } from '@/entities/Product.entity';
import { CreateProductDto, UpdateProductDto } from '@/types/product.types';

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product>;
  create(product: CreateProductDto): Promise<Product>;
  update(id: number, product: UpdateProductDto): Promise<Product>;
  delete(id: number): Promise<void>;
}

export interface IProductService {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product>;
  createProduct(product: CreateProductDto): Promise<Product>;
  updateProduct(id: number, product: UpdateProductDto): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
}
