import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../users/users.service'; // Đảm bảo đường dẫn đúng

// Mở rộng giao diện Request để thêm thuộc tính user
interface CustomRequest extends Request {
  user?: { userId: number; userName?: string; roles?: string[] };
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}  // Thêm UserService vào constructor

  async use(req: CustomRequest, res: Response, next: NextFunction) {
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
      
      console.log('Decoded token:', decoded);

      if (typeof decoded.sub !== 'number' || !decoded.userName) {
        throw new UnauthorizedException('Invalid token');
      }

      const userId = Number(decoded.sub);

      if (isNaN(userId)) {
        throw new UnauthorizedException('Invalid token');
      }

      // Lấy thông tin người dùng và vai trò của họ từ cơ sở dữ liệu
      const user = await this.userService.findOne(userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const roles = await this.userService.getUserRoles(userId);

      // Gán thông tin người dùng và vai trò vào req.user
      req.user = { userId, userName: decoded.userName, roles };

      next();
    } catch (error) {
      console.error('Token validation error:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
