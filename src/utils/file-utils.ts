import { BadRequestException } from '@nestjs/common';

export function validateFileMimeType(file: Express.Multer.File, allowedMimeTypes: string[]): boolean {
  const isValid = allowedMimeTypes.some(mimeType => file.mimetype === mimeType);
  if (!isValid) {
    throw new BadRequestException(`Only files with types: ${allowedMimeTypes.join(', ')} are allowed`);
  }
  return true;
}