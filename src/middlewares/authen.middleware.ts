import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

// Mở rộng giao diện Request để thêm thuộc tính user
interface CustomRequest extends Request {
  user?: { userId: number; userName?: string };
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: CustomRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token malformed');
    }

    try {
      // Xác thực token
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
      
      // In ra nội dung đã giải mã
      console.log('Decoded token:', decoded);

      // Kiểm tra sự tồn tại của sub và userName trong payload
      if (typeof decoded.sub !== 'number' || !decoded.userName) {
        throw new UnauthorizedException('Invalid token');
      }

      // Chuyển đổi sub từ string sang number
      const userId = Number(decoded.sub);

      if (isNaN(userId)) {
        throw new UnauthorizedException('Invalid token');
      }

      // Gán payload vào request
      req.user = { userId, userName: decoded.userName };

      next();
    } catch (error) {
      console.error('Token validation error:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
