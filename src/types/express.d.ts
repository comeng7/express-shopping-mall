import { DecodedToken } from '@/middlewares/auth.middleware';

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}
