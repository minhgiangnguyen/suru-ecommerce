import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaService } from '../../services/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryService } from '../../services/cloudinary.service';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET })],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, CloudinaryService],
})
export class ProductsModule {}


