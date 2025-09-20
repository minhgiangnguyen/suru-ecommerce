import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }): Promise<{ accessToken: string }> {
    return this.authService.validateUserAndLogin(body.username, body.password);
  }
}


