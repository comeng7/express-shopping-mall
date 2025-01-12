// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { Service, Inject } from 'typedi';
import { ZodError } from 'zod';

import { logger } from '@/config/logger.config';
import { BaseError } from '@/errors';
import { UserService } from '@/services/user.service';
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
  async createUser(req: Request, res: Response) {
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
   *     description: 아이디와 비밀번호로 로그인합니다.
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
   *                   example: 'eyJhbGciOiJ.IUzI1NiIsI.nR5cCI6I'
   *       400:
   *         $ref: '#/components/responses/Error'
   */
  async login(req: Request, res: Response) {
    try {
      const validatedData = loginSchema.parse(req.body);
      const tokenData = await this.userService.login({
        userId: validatedData.userId,
        password: validatedData.password,
      });
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
   *               type: object
   *               properties:
   *                 $ref: '#/components/schemas/UserResponse'
   *       401:
   *         $ref: '#/components/responses/Error'
   */
  async getUserMe(req: Request, res: Response) {
    try {
      // auth 미들웨어에서 할당한 req.user
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          status: 'error',
          code: 'UNAUTHORIZED',
          message: '로그인이 필요합니다.',
        });
      }

      // DB에서 유저 정보 검색
      const userData = await this.userService.getUserByUserId(userId);
      if (!userData) {
        return res.status(404).json({
          status: 'error',
          code: 'UNAUTHORIZED',
          message: '유저를 찾을 수 없습니다.',
        });
      }

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
