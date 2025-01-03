import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // 응답이 완료되면 실행되는 리스너
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`
      Time: ${new Date().toISOString()}
      Method: ${req.method}
      URL: ${req.url}
      Status: ${res.statusCode}
      Duration: ${duration}ms
      IP: ${req.ip}
    `);
  });

  next();
};
