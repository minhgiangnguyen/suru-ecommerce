import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from "../services/prisma.service";


@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers['authorization'] as string | undefined;

    if (!auth || !auth.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing token');
    }

    const token = auth.slice('Bearer '.length);

    try {
      const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      
      // Lấy user từ database để có displayName và avatar
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        select: {
          id: true,
          username: true,
          role: true,
          displayName: true,
          avatar: true,
        },
      });

      if (!user) throw new UnauthorizedException('User not found');

      req.user = user; // gán toàn bộ user vào req.user
      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
