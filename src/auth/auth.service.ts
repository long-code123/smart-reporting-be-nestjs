import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@src/users/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly accessTokenExpiresIn = '5m'; // 5 minutes
  private readonly refreshTokenExpiresIn = '2h'; // 2 hours

  constructor(private readonly usersService: UserService) {}

  async validateUser(account: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByAccount(account);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.get(); // Exclude password from result
      return result;
    }
    return null;
  }

  async login(account: string, password: string): Promise<any> {
    const user = await this.validateUser(account, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // In thông tin người dùng để kiểm tra
    console.log('Authenticated user:', user);

    // Create access token with userName
    const accessToken = jwt.sign(
      { sub: user.userId, userName: user.userName },  // Sử dụng user.userName
      process.env.JWT_SECRET,
      { expiresIn: this.accessTokenExpiresIn }
    );
    console.log('Generated access token:', accessToken);

    // Create refresh token without userName
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
      
      // In ra nội dung đã giải mã
      console.log('Decoded refresh token:', decoded);

      const accessToken = jwt.sign(
        { sub: (decoded as any).sub }, 
        process.env.JWT_SECRET,
        { expiresIn: this.accessTokenExpiresIn }
      );
      return { accessToken };
    } catch (error) {
      console.error('Token validation error:', error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
