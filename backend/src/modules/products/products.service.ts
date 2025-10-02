import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../services/prisma.service";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.product
      .findMany({
        include: { images: true },
      })
      .then((products) =>
        products.map((p) => {
          const features = (p as any).features;
          return {
            ...p,
            purchase_options: p.purchaseOptions ?? [],
            features:
              features &&
              typeof features === "object" &&
              !Array.isArray(features)
                ? features
                : { title: "", items: [], note: "" },
          };
        })
      );
  }

  async getById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { images: true },
    });
    if (!product) throw new NotFoundException("Không tìm thấy sản phẩm");
    const features = (product as any).features;
    return {
      ...product,
      purchase_options: product.purchaseOptions ?? [],
      features:
        features && typeof features === "object" && !Array.isArray(features)
          ? features
          : { title: "", items: [], note: "" },
    };
  }

  // async getByUrl(urlProduct: string) {
  //   const product = await this.prisma.product.findUnique({
  //     where: { urlProduct },
  //     include: { images: true },
  //   });
  //   if (!product) throw new NotFoundException("Không tìm thấy sản phẩm");
  //   const features = (product as any).features;
  //   return {
  //     ...product,
  //     purchase_options: product.purchase_options ?? [],
  //     features: features && typeof features === 'object' && !Array.isArray(features)
  //       ? features
  //       : { title: '', items: [], note: '' },
  //   };
  // }
  async getByUrl(urlProduct: string) {
    return this.prisma.product.findUnique({
      where: { urlProduct },
      include: {
        images: true,
        reviews: {
          include: {
            replies: true, // lấy luôn replies của mỗi review
          },
        },
      },
    });
  }

  create(data: any) {
    let {
      purchaseOptions,
      details,
      features,
      buyCount,
      reviewCount,
      ...rest
    } = data;
    if (typeof features === "string") {
      try {
        features = JSON.parse(features);
      } catch {
        features = { title: "", items: [], note: "" };
      }
    }
    // Validate features là object đúng format
    if (!features || typeof features !== "object" || Array.isArray(features)) {
      features = { title: "", items: [], note: "" };
    }
    if (!Array.isArray(features.items)) features.items = [];
    if (typeof features.title !== "string") features.title = "";
    if (features.note && typeof features.note !== "string")
      delete features.note;
    // Hàm convert string -> number an toàn
    const toNumberOrUndefined = (val: any) => {
      if (val === undefined || val === null || val === "") return undefined;
      if (typeof val === "number") return val;
      if (typeof val === "string" && !isNaN(Number(val))) return Number(val);
      return undefined;
    };
    return this.prisma.product.create({
      data: {
        ...rest,
        details: details ?? "",
        purchaseOptions: purchaseOptions ?? [],
        features,
        buyCount: toNumberOrUndefined(buyCount),
        reviewCount: toNumberOrUndefined(reviewCount),
      },
    });
  }

  update(id: number, data: any) {
    // let { purchase_options, details, features, viewCount, ...rest } = data;
    // if (typeof features === "string") {
    //   try {
    //     features = JSON.parse(features);
    //   } catch {
    //     features = { title: "", items: [], note: "" };
    //   }
    // }
    // if (!features || typeof features !== "object" || Array.isArray(features)) {
    //   features = { title: "", items: [], note: "" };
    // }
    // if (!Array.isArray(features.items)) features.items = [];
    // if (typeof features.title !== "string") features.title = "";
    // if (features.note && typeof features.note !== "string")
    //   delete features.note;
    // const updateData: any = { ...rest };
    // if (details !== undefined) updateData.details = details;
    // if (features !== undefined) updateData.features = features;
    // if (typeof viewCount === "number") updateData.viewCount = viewCount;
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.$transaction(async (tx) => {
      // Delete images
      await tx.productImage.deleteMany({ where: { productId: id } });
      // Delete review replies via relation filter
      await tx.reviewReply.deleteMany({ where: { review: { productId: id } } });
      // Delete reviews
      await tx.review.deleteMany({ where: { productId: id } });
      // Delete orders
      await tx.order.deleteMany({ where: { productId: id } });
      // Finally delete product
      return tx.product.delete({ where: { id } });
    });
  }

  // Images
  getImages(productId: number) {
    return this.prisma.productImage.findMany({ where: { productId } });
  }

  async addImage(
    productId: number,
    data: { imageUrl: string; position: string }
  ) {
    return this.prisma.productImage.create({ data: { productId, ...data } });
  }
  updateImage(productId: number, imageId: number, data: any) {
    return this.prisma.productImage.update({ where: { id: imageId }, data });
  }

  async deleteImage(productId: number, imageId: number) {
    // Kiểm tra ảnh có tồn tại và thuộc productId không
    const image = await this.prisma.productImage.findUnique({
      where: { id: imageId },
    });
    if (!image || image.productId !== productId) {
      throw new NotFoundException("Ảnh không tồn tại");
    }
    return this.prisma.productImage.delete({ where: { id: imageId } });
  }
}
