import { Product } from '@/entities/Product.entity';
import { TCreateProductDto } from '@/validators/product.validator';

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product>;
  create(product: TCreateProductDto): Promise<Product>;
}

export interface IProductService {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product>;
  createProduct(product: TCreateProductDto): Promise<Product>;
}
