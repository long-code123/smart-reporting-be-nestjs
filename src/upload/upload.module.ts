import { BadRequestException, Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer'; 

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, callback) => {
          callback(null, '');
        },
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        }
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(png|jpeg)$/)) {
          return callback(new BadRequestException('Only PNG and JPG files are allowed'), false);
        }
        callback(null, true);
      },
    }),
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
