import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@src/users/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly accessTokenExpiresIn = process.env.ACCESS_TOKEN_EXPRIRES_IN; 
  private readonly refreshTokenExpiresIn = process.env.REFRESH_TOKEN_EXPRIRES_IN;

  constructor(private readonly usersService: UserService) {}

  async validateUser(account: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByAccount(account);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.get();
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(account: string, password: string): Promise<any> {
    const user = await this.validateUser(account, password);

    console.log('Authenticated user:', user);
    const roles = await this.usersService.getUserRoles(user.userId);

    const accessToken = jwt.sign(
      { sub: user.userId, userName: user.userName, roles }, 
      process.env.JWT_SECRET,
      { expiresIn: this.accessTokenExpiresIn }
    );
    console.log('Generated access token:', accessToken);

    
    const refreshToken = jwt.sign(
      { sub: user.userId }, 
      process.env.JWT_SECRET,
      { expiresIn: this.refreshTokenExpiresIn }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<any> {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
      
      console.log('Decoded refresh token:', decoded);
  
      const newAccessToken = jwt.sign(
        { sub: (decoded as any).sub, roles: (decoded as any).roles }, 
        process.env.JWT_SECRET,
        { expiresIn: this.accessTokenExpiresIn }
      );
  
      const newRefreshToken = jwt.sign(
        { sub: (decoded as any).sub }, 
        process.env.JWT_SECRET,
        { expiresIn: this.refreshTokenExpiresIn }
      );
  
      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      console.error('Token validation error:', error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
  
}
