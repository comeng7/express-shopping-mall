import { Inject, Service } from 'typedi';
import { Repository, DataSource } from 'typeorm';
import { Product } from '@/entities/Product.entity';
import { CreateProductDto, UpdateProductDto } from '@/types/product.types';

@Service()
export class ProductRepository {
  private repository: Repository<Product>;

  constructor(@Inject() private dataSource: DataSource) {
    this.repository = dataSource.getRepository(Product);
  }

  async findAll(): Promise<Product[]> {
    return this.repository.find({ relations: ['category'] });
  }

  async findById(id: number): Promise<Product | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async create(data: CreateProductDto): Promise<Product> {
    const product = this.repository.create(data);
    return this.repository.save(product);
  }

  async update(id: number, data: UpdateProductDto): Promise<Product | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
