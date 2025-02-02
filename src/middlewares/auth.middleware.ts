import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface DecodedToken {
  userNo: number;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader?.startsWith('Bearer ')) {
      res.status(401).json({
        status: 'error',
        code: 'NO_TOKEN',
        message: '인증 토큰이 없습니다.',
      });

      return;
    }

    // 헤더에서 Bearer 제거
    const token = authorizationHeader.replace('Bearer ', '');

    const secretKey = process.env.JWT_SECRET ?? 'secret';
    const decoded = jwt.verify(token, secretKey) as DecodedToken;

    // 디코딩 결과를 req.user 로 저장
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error in authMiddleware:', error);

    res.status(401).json({
      status: 'error',
      code: 'INVALID_TOKEN',
      message: '유효하지 않은 토큰입니다.',
    });
  }
};
