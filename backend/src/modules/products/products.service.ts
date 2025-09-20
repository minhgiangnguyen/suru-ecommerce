import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.product.findMany({
      include: { images: true, features: true, labels: true },
    });
  }

  async getById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { images: true, features: true, labels: true },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  create(data: any) {
    return this.prisma.product.create({ data });
  }

  update(id: number, data: any) {
    return this.prisma.product.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }

  // Labels
  getLabels(productId: number) {
    return this.prisma.quantityLabel.findMany({ where: { productId } });
  }
  addLabel(productId: number, data: any) {
    return this.prisma.quantityLabel.create({ data: { ...data, productId } });
  }
  updateLabel(productId: number, labelId: number, data: any) {
    return this.prisma.quantityLabel.update({ where: { id: labelId }, data });
  }
  deleteLabel(productId: number, labelId: number) {
    return this.prisma.quantityLabel.delete({ where: { id: labelId } });
  }

  // Images
  getImages(productId: number) {
    return this.prisma.productImage.findMany({ where: { productId } });
  }
  addImage(productId: number, data: any) {
    return this.prisma.productImage.create({ data: { ...data, productId } });
  }
  updateImage(productId: number, imageId: number, data: any) {
    return this.prisma.productImage.update({ where: { id: imageId }, data });
  }
  deleteImage(productId: number, imageId: number) {
    return this.prisma.productImage.delete({ where: { id: imageId } });
  }

  // Features
  getFeatures(productId: number) {
    return this.prisma.productFeature.findMany({ where: { productId } });
  }
  addFeature(productId: number, data: any) {
    return this.prisma.productFeature.create({ data: { ...data, productId } });
  }
  updateFeature(productId: number, featureId: number, data: any) {
    return this.prisma.productFeature.update({ where: { id: featureId }, data });
  }
  deleteFeature(productId: number, featureId: number) {
    return this.prisma.productFeature.delete({ where: { id: featureId } });
  }
}


