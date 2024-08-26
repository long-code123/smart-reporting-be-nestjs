import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../users/users.service';

interface CustomRequest extends Request {
  user?: { userId: number; userName?: string; roles?: string[] };
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {} 

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
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
      
      console.log('Decoded token:', decoded);

      if (typeof decoded.sub !== 'number' || !decoded.userName) {
        throw new UnauthorizedException('Invalid token');
      }

      req.user = { 
        userId: Number(decoded.sub), 
        userName: decoded.userName, 
        roles: decoded.roles as string[] 
      };

      next();
    } catch (error) {
      console.error('Token validation error:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
