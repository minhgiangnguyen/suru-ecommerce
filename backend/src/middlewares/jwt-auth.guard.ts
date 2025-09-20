import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers['authorization'] as string | undefined;
    if (!auth || !auth.startsWith('Bearer ')) throw new UnauthorizedException('Missing token');
    const token = auth.slice('Bearer '.length);
    try {
      const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET || 'changeme' });
      req.user = payload;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}


