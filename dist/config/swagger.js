"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
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
    apis: ['./src/routes/*.ts'],
};
exports.specs = (0, swagger_jsdoc_1.default)(options);
