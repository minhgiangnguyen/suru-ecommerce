import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { CloudinaryService } from "../../services/cloudinary.service";
import { FileInterceptor } from "@nestjs/platform-express";
import * as multer from "multer";
import { JwtAuthGuard } from "../../middlewares/jwt-auth.guard";

const multerOptions = {
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, acceptFile: boolean) => void
  ) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Chỉ được tải lên ảnh!"), false);
    }
  },
};

@Controller("reviews")
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  // ===== Review CRUD =====
  @UseGuards(JwtAuthGuard)
  @Post("product/:productId")
  createReview(@Param("productId") productId: string, @Body() body: any) {
    return this.reviewsService.createReview(+productId, body);
  }
  @UseGuards(JwtAuthGuard)
  @Get("product/:productId")
  getReviews(@Param("productId") productId: string) {
    return this.reviewsService.getReviews(+productId);
  }
  @UseGuards(JwtAuthGuard)
  @Put(":reviewId")
  updateReview(@Param("reviewId") reviewId: string, @Body() body: any) {
    return this.reviewsService.updateReview(+reviewId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":reviewId")
  deleteReview(@Param("reviewId") reviewId: string) {
    return this.reviewsService.deleteReview(+reviewId);
  }

  // ===== Reply CRUD =====

  @UseGuards(JwtAuthGuard)
  @Post(":reviewId/replies")
  createReply(
    @Param("reviewId") reviewId: string,
    @Body() body: { comment: string; day: number; role: "admin" | "author" },
    // @Req() req: any // đây là user đã được guard gán
  ) {
    // const user = req.user;
    return this.reviewsService.createReply(+reviewId, {
      // authorName: user.displayName,
      // avatarUrl: user.avatar,
      comment: body.comment,
      day: body.day,
      role: body.role,
    });
  }
  @UseGuards(JwtAuthGuard)
  @Get(":reviewId/replies")
  getReplies(@Param("reviewId") reviewId: string) {
    return this.reviewsService.getReplies(+reviewId);
  }

  @UseGuards(JwtAuthGuard)
  @Put("replies/:replyId")
  updateReply(@Param("replyId") replyId: string, @Body() body: any) {
    return this.reviewsService.updateReply(+replyId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("replies/:replyId")
  deleteReply(@Param("replyId") replyId: string) {
    return this.reviewsService.deleteReply(+replyId);
  }

  // ===== Upload file cho review (avatar / image) =====
  @UseGuards(JwtAuthGuard)
  @Post(":reviewId/upload/:type")
  @UseInterceptors(FileInterceptor("file", multerOptions))
  async uploadReviewFile(
    @Param("reviewId") reviewId: string,
    @Param("type") type: "avatar" | "image",
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      throw new Error("Không có file upload!");
    }

    // Chọn folder theo type
    const folder = type === "avatar" ? "reviews/avatars" : "reviews/images";

    const result = await this.cloudinaryService.uploadImage(file, folder);

    // Cập nhật trường tương ứng
    const updateData =
      type === "avatar"
        ? { avatarUrl: result.secure_url }
        : { imageUrl: result.secure_url };

    await this.reviewsService.updateReview(+reviewId, updateData);

    // Trả về review đã cập nhật
    return this.reviewsService.getById(+reviewId);
  }
}
