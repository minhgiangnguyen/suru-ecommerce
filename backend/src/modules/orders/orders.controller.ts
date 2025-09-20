import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../../middlewares/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() body: any) {
    return this.ordersService.create(body);
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
}


