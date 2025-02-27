// swagger.config.ts
import swaggerJsdoc from 'swagger-jsdoc';

import { CATEGORY_CODE } from '@/constants/category.constants';

const swaggerPath =
  process.env.NODE_ENV === 'production'
    ? './dist/controllers/*.js'
    : './src/controllers/*.ts';

export const swaggerOptions = {
  persistAuthorization: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: '쇼핑몰 API',
      version: '1.0.0',
      description: '쇼핑몰 API 문서',
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === 'production'
            ? `https://comeng7.store`
            : `http://localhost:${process.env.PORT || 3000}`,
        description:
          process.env.NODE_ENV === 'production' ? '운영 서버' : '개발 서버',
      },
    ],
    components: {
      schemas: {
        CategoryCode: {
          type: 'string',
          enum: Object.values(CATEGORY_CODE),
          example: 'TWIN_BAG',
        },
        CreateProductDto: {
          type: 'object',
          required: [
            'name',
            'price',
            'imageUrl',
            'width',
            'height',
            'strapSize',
            'weight',
            'categoryCode',
            'color',
          ],
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
            width: {
              type: 'number',
              description: '가로 길이 (cm)',
              example: 30,
            },
            height: {
              type: 'number',
              description: '세로 길이 (cm)',
              example: 20,
            },
            strapSize: {
              type: 'number',
              description: '스트랩 길이 (cm)',
              example: 100,
            },
            weight: {
              type: 'number',
              description: '무게 (g)',
              example: 500,
            },
            categoryCode: {
              allOf: [
                { $ref: '#/components/schemas/CategoryCode' },
                { description: '상품 카테고리' },
              ],
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
        ProductListResponse: {
          type: 'object',
          required: ['data'],
          properties: {
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/ProductResponse',
              },
            },
          },
        },
        ProductResponse: {
          type: 'object',
          required: [
            'id',
            'name',
            'price',
            'imageUrl',
            'width',
            'height',
            'strapSize',
            'weight',
            'category',
            'isNew',
            'isBest',
            'color',
          ],
          properties: {
            id: {
              type: 'number',
              description: '상품 고유 ID',
              example: 1,
            },
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
              description: '상품 이미지 URL',
              example: 'https://example.com/image.jpg',
            },
            width: {
              type: 'number',
              description: '가로 길이 (cm)',
              example: 30,
            },
            height: {
              type: 'number',
              description: '세로 길이 (cm)',
              example: 20,
            },
            strapSize: {
              type: 'number',
              description: '스트랩 길이 (cm)',
              example: 100,
            },
            weight: {
              type: 'number',
              description: '무게 (g)',
              example: 500,
            },
            category: {
              allOf: [
                { $ref: '#/components/schemas/CategoryCode' },
                { description: '상품 카테고리' },
              ],
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
            description: {
              type: 'string',
              description: '상품 설명',
              example: '편안한 착용감의 트윈 백입니다.',
            },
          },
        },
        CreateUserDto: {
          type: 'object',
          required: ['name', 'email', 'password', 'confirmPassword', 'userId'],
          properties: {
            name: {
              type: 'string',
              description: '사용자 이름',
              example: '홍길동',
            },
            email: {
              type: 'string',
              format: 'email',
              description: '이메일 주소',
              example: 'hong@example.com',
            },
            phoneNumber: {
              type: 'string',
              description: '전화번호',
              example: '01012345678',
            },
            postCode: {
              type: 'string',
              description: '우편번호 (선택사항)',
              example: '12345',
            },
            address: {
              type: 'string',
              description: '주소 (선택사항)',
              example: '서울시 강남구',
            },
            password: {
              type: 'string',
              description: '비밀번호 (8자 이상, 숫자/영문/특수문자 포함)',
              example: 'P@ssw0rd!',
            },
            confirmPassword: {
              type: 'string',
              description: '비밀번호 확인',
              example: 'P@ssw0rd!',
            },
            userId: {
              type: 'string',
              description: '로그인용 아이디',
              example: 'hong123',
            },
          },
        },
        LoginDto: {
          type: 'object',
          required: ['userId', 'password'],
          properties: {
            userId: {
              type: 'string',
              example: 'hong123',
            },
            password: {
              type: 'string',
              minLength: 8,
              example: 'P@ssw0rd!',
            },
          },
        },
        UpdateUserDto: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: '이메일 주소',
              example: 'hong@example.com',
            },
            phoneNumber: {
              type: 'string',
              description: '전화번호',
              example: '01012345678',
            },
            postCode: {
              type: 'string',
              description: '우편번호 (선택사항)',
              example: '12345',
            },
            address: {
              type: 'string',
              description: '주소 (선택사항)',
              example: '서울시 강남구',
            },
          },
        },
        UserResponse: {
          type: 'object',
          required: ['name', 'email', 'userId'],
          properties: {
            name: {
              type: 'string',
              description: '사용자 이름',
              example: '홍길동',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'hong@example.com',
            },
            userId: {
              type: 'string',
              description: '로그인용 아이디',
              example: 'hong123',
            },
            phoneNumber: {
              type: 'string',
              description: '전화번호',
              example: '01012345678',
            },
            postCode: {
              type: 'string',
              description: '우편번호',
              example: '12345',
            },
            address: {
              type: 'string',
              description: '주소',
              example: '서울시 강남구',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-10-12T10:20:30Z',
            },
          },
        },
        CartListResponse: {
          type: 'object',
          required: ['data'],
          properties: {
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/CartResponse',
              },
            },
          },
        },
        CartResponse: {
          type: 'object',
          required: [
            'productId',
            'productName',
            'productPrice',
            'productImageUrl',
            'productColor',
            'quantity',
            'createdAt',
          ],
          properties: {
            productId: {
              type: 'number',
              description: '상품 고유 ID',
              example: 1,
            },
            productName: {
              type: 'string',
              description: '상품명',
              example: '트윈 백',
            },
            productPrice: {
              type: 'number',
              description: '가격',
              example: 150000,
            },
            productImageUrl: {
              type: 'string',
              description: '상품 이미지 URL',
              example: 'https://example.com/image.jpg',
            },
            productColor: {
              type: 'string',
              description: '색상',
              example: 'Black',
            },
            quantity: {
              type: 'number',
              description: '수량',
              example: 2,
            },
            createdAt: {
              type: 'string',
              description: '장바구니에 담은 시각',
              example: '2023-10-12T10:20:30Z',
            },
          },
        },
        Success: {
          type: 'object',
          properties: {
            result: {
              type: 'boolean',
              example: true,
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
      responses: {
        Success: {
          description: '성공 응답',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Success',
              },
            },
          },
        },
        Error: {
          description: '에러 응답',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [swaggerPath],
};

export const specs = swaggerJsdoc(swaggerOptions);
