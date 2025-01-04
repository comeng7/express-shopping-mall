import swaggerJsdoc from 'swagger-jsdoc';
import { CATEGORY_CODE } from '@/constants/category.constants';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '쇼핑몰 API',
      version: '1.0.0',
      description: '쇼핑몰 백엔드 API 문서',
    },
    components: {
      schemas: {
        CategoryCode: {
          type: 'string',
          enum: Object.values(CATEGORY_CODE),
          example: 'TWIN_BAG',
        },
        CreateProductDto: {
          type: 'object',
          required: ['name', 'price', 'imageUrl', 'categoryCode', 'color'],
          properties: {
            name: {
              type: 'string',
              description: '상품명',
              example: '트윈 백',
            },
            price: {
              type: 'number',
              description: '가격',
              example: 150000,
            },
            imageUrl: {
              type: 'string',
              format: 'url',
              description: '상품 이미지 URL',
              example: 'https://example.com/image.jpg',
            },
            categoryCode: {
              $ref: '#/components/schemas/CategoryCode',
            },
            description: {
              type: 'string',
              description: '상품 설명',
              example: '편안한 착용감의 트윈 백입니다.',
            },
            isNew: {
              type: 'boolean',
              description: '신상품 여부',
              example: true,
            },
            isBest: {
              type: 'boolean',
              description: '베스트상품 여부',
              example: false,
            },
            color: {
              type: 'string',
              description: '색상',
              example: 'Black',
            },
          },
        },
        ProductResponse: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              example: 1,
            },
            name: {
              type: 'string',
              example: '트윈 백',
            },
            price: {
              type: 'number',
              example: 150000,
            },
            imageUrl: {
              type: 'string',
              example: 'https://example.com/image.jpg',
            },
            categoryName: {
              type: 'string',
              example: 'TWIN BAG',
            },
            isNew: {
              type: 'boolean',
              example: true,
            },
            isBest: {
              type: 'boolean',
              example: false,
            },
            color: {
              type: 'string',
              example: 'Black',
            },
            description: {
              type: 'string',
              example: '편안한 착용감의 트윈 백입니다.',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'error',
            },
            code: {
              type: 'string',
              example: 'VALIDATION_ERROR',
            },
            message: {
              type: 'string',
              example: '유효하지 않은 입력입니다.',
            },
          },
        },
      },
    },
  },
  apis: ['./src/controllers/*.ts'],
};
export const specs = swaggerJsdoc(swaggerOptions);
