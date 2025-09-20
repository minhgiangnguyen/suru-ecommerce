import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { PrismaService } from '../../services/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET || 'changeme' })],
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService],
})
export class ReviewsModule {}


