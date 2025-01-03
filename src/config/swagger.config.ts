import { Options } from 'swagger-jsdoc';

export const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '쇼핑몰 API',
      version: '1.0.0',
      description: '쇼핑몰 백엔드 API 문서',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/controllers/*.ts'],
};
