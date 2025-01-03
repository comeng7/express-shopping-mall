import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '쇼핑몰 API',
      version: '1.0.0',
      description: '쇼핑몰 API 문서',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' ? `http://${process.env.EC2_PUBLIC_IP}` : `http://localhost:${process.env.PORT || 3000}`,
        description: process.env.NODE_ENV === 'production' ? '운영 서버' : '개발 서버',
      },
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: '상품 ID',
            },
            name: {
              type: 'string',
              description: '상품명',
            },
            price: {
              type: 'number',
              description: '상품 가격',
            },
            description: {
              type: 'string',
              description: '상품 설명',
            },
          },
        },
        CreateProductDto: {
          type: 'object',
          required: ['name', 'price'],
          properties: {
            name: {
              type: 'string',
              description: '상품명',
            },
            price: {
              type: 'number',
              description: '상품 가격',
            },
            description: {
              type: 'string',
              description: '상품 설명',
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
              example: 'INTERNAL_SERVER_ERROR',
            },
            message: {
              type: 'string',
              example: '서버 내부 오류가 발생했습니다.',
            },
          },
        },
      },
    },
  },
  apis: ['./src/controllers/*.ts'],
};

export const specs = swaggerJsdoc(options);
