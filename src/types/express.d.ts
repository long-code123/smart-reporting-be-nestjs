// src/types/express.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; 
      file?: Multer.File; 
    }

    namespace Multer {
      interface File {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        destination: string;
        filename: string;
        path: string;
        buffer: Buffer;
      }
    }
  }
}
