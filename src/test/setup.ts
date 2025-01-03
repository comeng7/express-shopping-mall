import { AppDataSource } from '@/config/typeorm.config';
import 'reflect-metadata';

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});
