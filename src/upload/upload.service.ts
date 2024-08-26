import { Injectable, BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { validateFileMimeType } from '@src/utils/file-utils';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class UploadService {
  getMulterOptions(): MulterOptions {
    return {
      storage: diskStorage({
        destination: (req, file, callback) => {
          callback(null, ''); 
        },
        filename: (req, file, callback) => {
          const ext = extname(file.originalname);
          callback(null, `${Date.now()}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        try {
          validateFileMimeType(file, ['image/png', 'image/jpeg']);
          callback(null, true);
        } catch (error) {
          callback(error, false);
        }
      },
    };
  }
}