import swaggerJsdoc from 'swagger-jsdoc';

const swaggerPath = process.env.NODE_ENV === 'production' ? './dist/routes/*.js' : './src/routes/*.ts';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '쇼핑몰 API',
      version: '1.0.0',
      description: '쇼핑몰 API 문서',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' ? `http://${process.env.EC2_PUBLIC_IP}:${process.env.PORT || 3000}` : `http://localhost:${process.env.PORT || 3000}`,
        description: process.env.NODE_ENV === 'production' ? '운영 서버' : '개발 서버',
      },
    ],
  },
  apis: [swaggerPath],
};

export const specs = swaggerJsdoc(options);
