import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(data: { customer: { name: string; phone: string; address: string }; productId: number; quantityLabelId: number; totalPrice: number }) {
    const customer = await this.prisma.customer.create({ data: data.customer });
    return this.prisma.order.create({
      data: {
        customerId: customer.id,
        productId: data.productId,
        quantityLabelId: data.quantityLabelId,
        totalPrice: data.totalPrice,
        receiveStatus: 'pending',
        transferStatus: 'pending',
      },
    });
  }

  list() {
    return this.prisma.order.findMany({
      include: { customer: true, product: true, quantityLabel: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  updateStatus(id: number, data: { receiveStatus?: string; transferStatus?: string }) {
    return this.prisma.order.update({ where: { id }, data });
  }
}


