import { Inject, Service } from 'typedi';
import { Repository, DataSource } from 'typeorm';
import { Product } from '@/entities/Product.entity';
import { TCreateProductDto } from '@/validators/product.validator';
import { IProductRepository } from '@/interfaces/product.interface';

@Service()
export class ProductRepository implements IProductRepository {
  private repository: Repository<Product>;

  constructor(@Inject() private dataSource: DataSource) {
    this.repository = dataSource.getRepository(Product);
  }

  async findAll(category?: string): Promise<Product[]> {
    return this.repository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.category', 'c')
      .where('p.deletedAt IS NULL')
      .andWhere(category ? 'c.code = :category' : '1=1', { category })
      .getMany();
  }

  async findNew(): Promise<Product[]> {
    return this.repository.createQueryBuilder('p').leftJoinAndSelect('p.category', 'c').where('p.isNew = :isNew', { isNew: true }).andWhere('p.deletedAt IS NULL').getMany();
  }

  async findBest(): Promise<Product[]> {
    return this.repository.createQueryBuilder('p').leftJoinAndSelect('p.category', 'c').where('p.isBest = :isBest', { isBest: true }).andWhere('p.deletedAt IS NULL').getMany();
  }

  async findById(id: number): Promise<Product | null> {
    return this.repository.createQueryBuilder('p').leftJoinAndSelect('p.category', 'c').where('p.id = :id', { id }).andWhere('p.deletedAt IS NULL').getOne();
  }

  async create(data: TCreateProductDto): Promise<Product> {
    const product = this.repository.create(data);
    return this.repository.save(product);
  }
}
