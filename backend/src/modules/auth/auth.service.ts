import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../services/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async validateUserAndLogin(username: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user.id, role: user.role, username: user.username };
    const accessToken = await this.jwt.signAsync(payload);
    return { accessToken };
  }
}


