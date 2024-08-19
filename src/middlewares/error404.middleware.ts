import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';

@Injectable()
export class Error404Middleware implements NestMiddleware {
  private readonly logger = new Logger(Error404Middleware.name);

  use(req: Request, res: Response, next: NextFunction): void {
    // Tiếp tục với các route handler tiếp theo
    next();
  }

  // Phương thức xử lý lỗi 404
  handle404(req: Request, res: Response): void {
    this.logger.warn(`404 Not Found: ${req.originalUrl}`);
    res.status(404).json({
      statusCode: 404,
      message: 'Resource not found',
    });
  }
}
