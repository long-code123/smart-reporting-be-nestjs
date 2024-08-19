import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class StatusValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { status } = req.body;
    if (status && !['active', 'inactive'].includes(status)) {
      throw new HttpException('Invalid status value. Allowed values are "active" and "inactive".', HttpStatus.BAD_REQUEST);
    }
    next();
  }
}
