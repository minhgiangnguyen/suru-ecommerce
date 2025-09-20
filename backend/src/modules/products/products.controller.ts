import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../../middlewares/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll() {
    return this.productsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.productsService.getById(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: any) {
    return this.productsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.productsService.update(Number(id), body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(Number(id));
  }

  // QuantityLabels
  @Get(':id/labels')
  getLabels(@Param('id') id: string) {
    return this.productsService.getLabels(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/labels')
  addLabel(@Param('id') id: string, @Body() body: any) {
    return this.productsService.addLabel(Number(id), body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/labels/:labelId')
  updateLabel(@Param('id') id: string, @Param('labelId') labelId: string, @Body() body: any) {
    return this.productsService.updateLabel(Number(id), Number(labelId), body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/labels/:labelId')
  deleteLabel(@Param('id') id: string, @Param('labelId') labelId: string) {
    return this.productsService.deleteLabel(Number(id), Number(labelId));
  }

  // Images
  @Get(':id/images')
  getImages(@Param('id') id: string) {
    return this.productsService.getImages(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/images')
  addImage(@Param('id') id: string, @Body() body: any) {
    return this.productsService.addImage(Number(id), body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/images/:imageId')
  updateImage(@Param('id') id: string, @Param('imageId') imageId: string, @Body() body: any) {
    return this.productsService.updateImage(Number(id), Number(imageId), body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/images/:imageId')
  deleteImage(@Param('id') id: string, @Param('imageId') imageId: string) {
    return this.productsService.deleteImage(Number(id), Number(imageId));
  }

  // Features
  @Get(':id/features')
  getFeatures(@Param('id') id: string) {
    return this.productsService.getFeatures(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/features')
  addFeature(@Param('id') id: string, @Body() body: any) {
    return this.productsService.addFeature(Number(id), body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/features/:featureId')
  updateFeature(@Param('id') id: string, @Param('featureId') featureId: string, @Body() body: any) {
    return this.productsService.updateFeature(Number(id), Number(featureId), body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/features/:featureId')
  deleteFeature(@Param('id') id: string, @Param('featureId') featureId: string) {
    return this.productsService.deleteFeature(Number(id), Number(featureId));
  }
}


