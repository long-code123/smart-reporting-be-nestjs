import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ErrorMiddleware.name);

  use(req: Request, res: Response, next: NextFunction): void {
    res.on('finish', () => {
      if (res.statusCode >= 400) {
        this.logger.error(`Error occurred: ${res.statusCode} - ${res.statusMessage}`);
      }
    });

    next();
  }
}
