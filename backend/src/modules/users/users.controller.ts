import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  Request,
  BadRequestException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../../middlewares/jwt-auth.guard";
import * as bcrypt from "bcrypt";

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    username: string;
    role: string;
  };
}

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("profile")
  async getProfile(@Request() req: AuthenticatedRequest) {
    const user = await this.usersService.findById(req.user.id);
    if (!user) {
      throw new BadRequestException("User not found");
    }
    // Không trả về passwordHash
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  @Put("profile")
  async updateProfile(
    @Request() req: AuthenticatedRequest,
    @Body()
    updateData: {
      displayName?: string;
      username?: string;
      password?: string;
      avatar?: string;
    }
  ) {
    const userId = req.user.id;

    const updatePayload: any = {};

    if (updateData.displayName !== undefined) {
      updatePayload.displayName = updateData.displayName;
    }

    if (updateData.username !== undefined) {
      updatePayload.username = updateData.username;
    }

    if (updateData.avatar !== undefined) {
      updatePayload.avatar = updateData.avatar;
    }

    if (updateData.password) {
      updatePayload.passwordHash = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await this.usersService.update(userId, updatePayload);

    const { passwordHash, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }
}
