import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UploadController } from './upload.controller';
import { CloudinaryService } from '../../services/cloudinary.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class UploadModule {}
