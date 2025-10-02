import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../services/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async validateUserAndLogin(username: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (!user) throw new UnauthorizedException('Tài khoản hoặc mật khẩu không hợp lệ');
    
    const userPassword = await bcrypt.compare(password, user.passwordHash);
    if (!userPassword) throw new UnauthorizedException('Tài khoản hoặc mật khẩu không hợp lệ');
   

    const payload = { sub: user.id, role: user.role, username: user.username };
    const accessToken = await this.jwt.signAsync(payload);
    return { accessToken };
  }

  async resetPassword(username: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) throw new UnauthorizedException('User not found');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    await this.prisma.user.update({
      where: { username },
      data: { passwordHash: hash },
    });

    return { message: `Password for user "${username}" has been reset` };
  }
}


