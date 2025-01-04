import { Container } from 'typedi';
import { ProductService } from '@/services/product.service';

describe('ProductService', () => {
  let productService: ProductService;

  beforeAll(() => {
    productService = Container.get(ProductService);
  });

  // it('should create a product', async () => {
  //   const productDto: TCreateProductDto = {
  //     name: 'Test Product',
  //     price: 1000,
  //     imageUrl: 'https://example.com/image.jpg',
  //     categoryId: 1,
  //     description: 'Test Description',
  //     color: 'Red',
  //   };

  //   const product = await productService.createProduct(productDto);
  //   expect(product).toBeDefined();
  //   expect(product.name).toBe(productDto.name);
  // });
});
