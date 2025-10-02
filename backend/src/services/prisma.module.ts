import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // nếu muốn dùng PrismaService ở tất cả module mà không import lại
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
