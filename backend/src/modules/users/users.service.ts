import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  async update(id: number, updateData: {
    displayName?: string;
    username?: string;
    passwordHash?: string;
    avatar?: string;
  }) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }
}
