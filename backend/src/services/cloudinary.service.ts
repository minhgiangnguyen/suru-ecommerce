import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(file: Express.Multer.File, folder = 'products'): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder },
        (error: any, result: any) => {
          if (error || !result) return reject(error || new Error('No result from Cloudinary'));
          resolve(result);
        },
      ).end(file.buffer);
    });
  }
}
