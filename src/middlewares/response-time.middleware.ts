import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ResponseTimeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    const originalEnd = res.end;

    res.end = (function (this: Response, ...args: any[]): Response {
      const responseTime = Date.now() - start;
      res.setHeader('X-Response-Time', `${responseTime}ms`);
      return originalEnd.apply(this, args);
    }) as any;

    next();
  }
}
