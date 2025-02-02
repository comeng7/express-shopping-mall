import { Container } from 'typedi';
import { DataSource } from 'typeorm';

import { Cart } from '@/entities/Cart.entity';
import { CartItem } from '@/entities/CartItem.entity';
import { Category } from '@/entities/Category.entity';
import { Product } from '@/entities/Product.entity';
import { User } from '@/entities/User.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Product, Category, User, Cart, CartItem],
  synchronize: false,
  logging: true,
});

Container.set(DataSource, AppDataSource);
