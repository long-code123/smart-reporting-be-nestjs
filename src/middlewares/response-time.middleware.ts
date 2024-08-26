import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ResponseTimeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    const originalEnd = res.end;

    res.end = function (...args: any[]): Response {
      const responseTime = Date.now() - start;

      // Kiểm tra nếu headers đã được gửi thì không set lại header
      if (!res.headersSent) {
        res.setHeader('X-Response-Time', `${responseTime}ms`);
      }

      return originalEnd.apply(res, args);
    } as any;

    next();
  }
}
