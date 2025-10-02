import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../services/prisma.service";

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async getById(id: number) {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: {
        product: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!review) {
      throw new NotFoundException("Không tìm thấy review");
    }

    return review;
  }

  // CREATE REVIEW
  createReview(
    productId: number,
    data: {
      authorName: string;
      comment: string;
      rating?: number;
      avatarUrl?: string;
      imageUrl?: string;
      day: number;
    }
  ) {
    return this.prisma.review.create({ data: { ...data, productId } });
  }

  // READ REVIEWS
  getReviews(productId: number) {
    return this.prisma.review.findMany({
      where: { productId },
      orderBy: { day: "desc" },
      include: { replies: true },
    });
  }

  // UPDATE REVIEW
  async updateReview(
    reviewId: number,
    data: Partial<{
      authorName: string;
      comment: string;
      rating?: number;
      avatarUrl?: string;
      imageUrl?: string;
    }>
  ) {
    const existing = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });
    if (!existing) throw new NotFoundException("Review not found");
    return this.prisma.review.update({ where: { id: reviewId }, data });
  }

  // DELETE REVIEW
  async deleteReview(reviewId: number) {
    const existing = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });
    if (!existing) throw new NotFoundException("Review not found");
    return this.prisma.review.delete({ where: { id: reviewId } });
  }

  // ----------------
  // REPLY
  // ----------------

  async createReply(
    reviewId: number,
    data: {
      // authorName: string;
      comment: string;
      // avatarUrl?: string;
      day: number;
      role: "author" | "admin";
    }
  ) {
    return this.prisma.reviewReply.create({
      data: {
        reviewId,
        // authorName: data.authorName,
        // avatarUrl: data.avatarUrl,
        comment: data.comment,
        role: data.role,
        day: data.day,
      },
    });
  }

  getReplies(reviewId: number) {
    return this.prisma.reviewReply.findMany({
      where: { reviewId },
      // orderBy: [
      //   { role: "desc" },
      //   { day: "asc" },
      // ],
    });
  }

  async updateReply(
    replyId: number,
    // data: Partial<{ authorName: string; comment: string; avatarUrl?: string }>
    data: Partial<{ comment: string }>

  ) {
    const existing = await this.prisma.reviewReply.findUnique({
      where: { id: replyId },
    });
    if (!existing) throw new NotFoundException("Reply not found");
    return this.prisma.reviewReply.update({ where: { id: replyId }, data });
  }

  async deleteReply(replyId: number) {
    const existing = await this.prisma.reviewReply.findUnique({
      where: { id: replyId },
    });
    if (!existing) throw new NotFoundException("Reply not found");
    return this.prisma.reviewReply.delete({ where: { id: replyId } });
  }
}
