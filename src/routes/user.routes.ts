import { Router } from 'express';
import { createControllerMiddleware } from '@/middlewares/controller.middleware';
import { UserController } from '@/controllers/user.controller';

const router = Router();
const useController = createControllerMiddleware(UserController);

/**
 * @swagger
 * tags:
 *   name: 유저
 *   description: 유저 관련 API
 */

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: 회원가입
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
router.post('/signup', useController('createUser'));

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: 로그인
 *     tags: [유저]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         $ref: '#/components/responses/Error'
 */
router.post('/login', useController('login'));

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
router.get('/me', useController('getUserMe'));

export default router;
