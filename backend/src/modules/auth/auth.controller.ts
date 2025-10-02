import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }): Promise<{ accessToken: string }> {
    return this.authService.validateUserAndLogin(body.username, body.password);
  }

  @Patch('reset-password')
  async resetPassword(@Body() body: { username: string; newPassword: string }) {
    return this.authService.resetPassword(body.username, body.newPassword);
  }

}


