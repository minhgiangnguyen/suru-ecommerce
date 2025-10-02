import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { PrismaService } from '../../services/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryService } from '../../services/cloudinary.service';
import { PrismaModule } from '../../services/prisma.module';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET }),PrismaModule],
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService,CloudinaryService],
})
export class ReviewsModule {}


