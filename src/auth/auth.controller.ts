import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body('account') account: string,
    @Body('password') password: string,
  ): Promise<any> {
    return this.authService.login(account, password);
  }

  @Post('refresh')
  async refreshToken(
    @Body('refreshToken') refreshToken: string,
  ): Promise<any> {
    return this.authService.refreshToken(refreshToken);
  }
}
