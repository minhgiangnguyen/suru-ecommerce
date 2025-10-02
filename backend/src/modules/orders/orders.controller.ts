import { Body, Controller, Get, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../../middlewares/jwt-auth.guard';
import { Response } from 'express';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() body: any) {
    const { fullName, phone, address, productId, purchaseOption, totalPrice } = body;

    return this.ordersService.create({
      customer: { name: fullName, phone, address },
      productId,
      purchaseOption,
      totalPrice,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  list() {
    return this.ordersService.list();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body() body: any) {
    return this.ordersService.updateStatus(Number(id), body);
  }

  @Get('export-pending')
  async exportPending(@Res() res: Response) {
    const buffer = await this.ordersService.exportOrders();

    res.setHeader(
      "Content-Disposition",
      `attachment; filename*=UTF-8''${encodeURIComponent("Đơn vận chuyển.xlsx")}`,
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    return res.send(buffer);
  }
}


