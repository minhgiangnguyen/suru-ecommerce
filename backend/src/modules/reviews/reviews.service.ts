import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  createReview(productId: number, data: { authorName: string; avatarUrl?: string; imageUrl?: string; rating?: number; comment: string }) {
    return this.prisma.review.create({ data: { ...data, productId } });
  }

  getReviews(productId: number) {
    return this.prisma.review.findMany({ where: { productId }, orderBy: { createdAt: 'desc' } });
  }

  createReply(reviewId: number, data: { authorName: string; avatarUrl?: string; comment: string }) {
    return this.prisma.reviewReply.create({ data: { ...data, reviewId } });
  }

  getReplies(reviewId: number) {
    return this.prisma.reviewReply.findMany({ where: { reviewId }, orderBy: { createdAt: 'asc' } });
  }
}


