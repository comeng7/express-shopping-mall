import { Request, Response } from 'express';

import { Product } from '@/entities/Product.entity';
import { TProductListResponse, TProductResponse } from '@/types/product.types';
import { TCreateProductDto } from '@/validators/product.validator';

export interface IProductRepository {
  findAll(category?: string): Promise<Product[]>;
  findNew(): Promise<Product[]>;
  findBest(): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
  create(data: TCreateProductDto): Promise<Product>;
}

export interface IProductService {
  getAllProducts(category?: string): Promise<TProductListResponse>;
  getNewProducts(): Promise<TProductListResponse>;
  getBestProducts(): Promise<TProductListResponse>;
  getProductById(id: number): Promise<TProductResponse | null>;
  createProduct(data: TCreateProductDto): Promise<Product>;
}

export interface IProductController {
  getProducts(req: Request, res: Response): Promise<void>;
  getNewProducts(req: Request, res: Response): Promise<void>;
  getBestProducts(req: Request, res: Response): Promise<void>;
  getProductById(req: Request, res: Response): Promise<void>;
  createProduct(req: Request, res: Response): Promise<void>;
}
