import { Injectable, BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class UploadService {
  getMulterOptions(): MulterOptions {
    return {
      storage: diskStorage({
        destination: (req, file, callback) => {
          callback(null, ''); // Đặt destination ở đây nếu cần
        },
        filename: (req, file, callback) => {
          const ext = extname(file.originalname);
          callback(null, `${Date.now()}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(png|jpeg)$/)) {
          return callback(new BadRequestException('Only PNG and JPG files are allowed'), false);
        }
        callback(null, true);
      },
    };
  }
}
