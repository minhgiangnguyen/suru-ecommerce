import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('products/:id/reviews')
  createReview(@Param('id') productId: string, @Body() body: any) {
    return this.reviewsService.createReview(Number(productId), body);
  }

  @Get('products/:id/reviews')
  getReviews(@Param('id') productId: string) {
    return this.reviewsService.getReviews(Number(productId));
  }

  @Post('reviews/:id/replies')
  createReply(@Param('id') reviewId: string, @Body() body: any) {
    return this.reviewsService.createReply(Number(reviewId), body);
  }

  @Get('reviews/:id/replies')
  getReplies(@Param('id') reviewId: string) {
    return this.reviewsService.getReplies(Number(reviewId));
  }
}


