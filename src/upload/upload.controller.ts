import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileUploadDto } from './dto/upload-file.dto';
import { validateFileMimeType } from '@src/utils/file-utils';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
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
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a file',
    type: FileUploadDto,
  })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file was uploaded');
    }
    return { message: 'File uploaded successfully', file };
  }
}