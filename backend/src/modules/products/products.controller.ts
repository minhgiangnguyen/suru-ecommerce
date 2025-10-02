import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { JwtAuthGuard } from "../../middlewares/jwt-auth.guard";
import { UseInterceptors, UploadedFile, UploadedFiles } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import * as multer from "multer";
import { CloudinaryService } from "../../services/cloudinary.service";

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
@Controller("products")
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Get()
  getAll() {
    return this.productsService.getAll();
  }

  @Get(":id")
  getById(@Param("id") id: string) {
    return this.productsService.getById(Number(id));
  }

  @Get("url/:urlProduct")
  getByUrl(@Param("urlProduct") urlProduct: string) {
    return this.productsService.getByUrl(urlProduct);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: any) {
    return this.productsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() body: any) {
    return this.productsService.update(Number(id), body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.productsService.delete(Number(id));
  }

 
  // Upload single special image (favicon, topImage, formImage)
  @UseGuards(JwtAuthGuard)
  @Post(":id/special-image")
  @UseInterceptors(FileInterceptor("file", multerOptions))
  async uploadSpecialImage(
    @Param("id") id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body("type") type: "favicon" | "topImage" | "formImage"
  ) {
    if (!["favicon", "topImage", "formImage"].includes(type)) {
      throw new BadRequestException("Loại ảnh không hợp lệ");
    }

    const folderMap = {
      favicon: "products/favicons",
      topImage: "products/top-images",
      formImage: "products/form-images",
    };

    const result = await this.cloudinaryService.uploadImage(
      file,
      folderMap[type]
    );

    await this.productsService.update(Number(id), {
      [type]: result.secure_url,
    });

    return this.productsService.getById(Number(id));
  }

  // Upload ảnh sản phẩm
  @UseGuards(JwtAuthGuard)
  @Post(":id/images")
  @UseInterceptors(FilesInterceptor("files", 10, multerOptions))
  async uploadImages(
    @Param("id") id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body("positions") positions: string
  ) {
    const posArr: string[] = JSON.parse(positions || "[]");
    const uploaded = await Promise.all(
      files.map((file, idx) =>
        this.cloudinaryService.uploadImage(file, "products/images")
      )
    );
    await Promise.all(
      uploaded.map((res, idx) =>
        this.productsService.addImage(Number(id), {
          imageUrl: res.secure_url,
          position: posArr[idx],
        })
      )
    );

    return this.productsService.getById(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id/images/:imageId")
  async deleteImage(
    @Param("id") productId: string,
    @Param("imageId") imageId: string
  ) {
    await this.productsService.deleteImage(Number(productId), Number(imageId));
    return { message: "Xoá ảnh thành công" };
  }
}
