import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../models/role.model'; // Đảm bảo đường dẫn đúng

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // Nếu không có vai trò yêu cầu, cho phép truy cập
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('User roles:', user?.roles); // Log vai trò người dùng

    if (!user || !user.roles) {
      throw new ForbiddenException('Access denied: No roles assigned');
    }

    return requiredRoles.some(role => user.roles.includes(role));
  }
}
