import { Router } from 'express';

import { UserController } from '@/controllers/user.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { createControllerMiddleware } from '@/middlewares/controller.middleware';

const router = Router();
const useController = createControllerMiddleware(UserController);

router.post('/signup', useController('createUser'));
router.post('/login', useController('login'));
router.get('/me', authMiddleware, useController('getUserMe'));
router.put('/me', authMiddleware, useController('updateUser'));

export default router;
