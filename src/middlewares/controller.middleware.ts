/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

export const createControllerMiddleware = <T>(
  ControllerClass: new (...args: any[]) => T,
) => {
  return (methodName: keyof T) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const controller = Container.get(ControllerClass);
        await (controller[methodName] as any).call(controller, req, res, next);
      } catch (error) {
        next(error);
      }
    };
  };
};
