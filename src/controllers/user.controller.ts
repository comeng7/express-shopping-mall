// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { Service, Inject } from 'typedi';
import { UserService } from '@/services/user.service';
import { ZodError } from 'zod';
import { BaseError } from '@/errors';
import { logger } from '@/config/logger.config';
import { createUserSchema, loginSchema } from '@/validators/user.validator';

@Service()
export class UserController {
  constructor(@Inject() private readonly userService: UserService) {}

  /**
   * @swagger
   * /api/users/signup:
   *   post:
   *     summary: 회원가입
   *     description: 새로운 유저를 생성합니다.
   *     tags: [유저]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateUserDto'
   *     responses:
   *       201:
   *         description: 회원가입 성공
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserResponse'
   *       400:
   *         $ref: '#/components/responses/Error'
   */
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const validatedData = createUserSchema.parse(req.body);
      const newUser = await this.userService.createUser(validatedData);
      return res.status(201).json(newUser);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'error',
          code: 'VALIDATION_ERROR',
          errors: error.errors,
        });
      } else if (error instanceof BaseError) {
        return res.status(error.statusCode).json({
          status: 'error',
          code: error.code,
          message: error.message,
        });
      } else {
        logger.error('Unexpected error:', error);
        return res.status(500).json({
          status: 'error',
          code: 'INTERNAL_SERVER_ERROR',
          message: '서버 내부 오류가 발생했습니다.',
        });
      }
    }
  }

  /**
   * @swagger
   * /api/users/login:
   *   post:
   *     summary: 로그인
   *     description: 이메일과 비밀번호로 로그인합니다.
   *     tags: [유저]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/LoginDto'
   *     responses:
   *       200:
   *         description: 로그인 성공 (토큰 발급)
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                   description: JWT 토큰
   *                   example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
   *       400:
   *         $ref: '#/components/responses/Error'
   */
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const validatedData = loginSchema.parse(req.body);
      const tokenData = await this.userService.login(validatedData.email, validatedData.password);
      return res.json(tokenData);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'error',
          code: 'VALIDATION_ERROR',
          errors: error.errors,
        });
      } else if (error instanceof BaseError) {
        return res.status(error.statusCode).json({
          status: 'error',
          code: error.code,
          message: error.message,
        });
      } else {
        logger.error('Unexpected error:', error);
        return res.status(500).json({
          status: 'error',
          code: 'INTERNAL_SERVER_ERROR',
          message: '서버 내부 오류가 발생했습니다.',
        });
      }
    }
  }

  /**
   * @swagger
   * /api/users/me:
   *   get:
   *     summary: 내 정보 조회
   *     tags: [유저]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: 유저 정보 조회 성공
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserResponse'
   *       401:
   *         $ref: '#/components/responses/Error'
   */
  async getUserMe(req: Request, res: Response): Promise<Response> {
    try {
      // if (!req.user) {
      //   return res.status(401).json({
      //     status: 'error',
      //     code: 'UNAUTHORIZED',
      //     message: '로그인이 필요합니다.',
      //   });
      // }

      const userId = 1;
      const userData = await this.userService.getUserById(userId);
      return res.json(userData);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).json({
          status: 'error',
          code: error.code,
          message: error.message,
        });
      } else {
        logger.error('Unexpected error:', error);
        return res.status(500).json({
          status: 'error',
          code: 'INTERNAL_SERVER_ERROR',
          message: '서버 내부 오류가 발생했습니다.',
        });
      }
    }
  }
}
