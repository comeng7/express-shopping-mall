import { DataSource } from 'typeorm';
import { Product } from '@/entities/Product.entity';
import { Category } from '@/entities/Category.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Product, Category],
  synchronize: false,
  logging: true,
});
