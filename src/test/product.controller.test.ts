import request from 'supertest';
import { Container } from 'typedi';

import app from '@/app';
import { ProductService } from '@/services/product.service';

describe('Product API', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let productService: ProductService;

  beforeAll(() => {
    productService = Container.get(ProductService);
  });

  describe('GET /products', () => {
    it('should return products list', async () => {
      const response = await request(app).get('/products').expect(200);

      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  describe('POST /products', () => {
    it('should create a new product', async () => {
      const productData = {
        name: 'Test Product',
        price: 1000,
        imageUrl: 'https://example.com/image.jpg',
        categoryId: 1,
        description: 'Test Description',
        color: 'Red',
      };

      const response = await request(app)
        .post('/products')
        .send(productData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(productData.name);
    });
  });
});
