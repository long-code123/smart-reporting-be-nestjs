// src/types/express.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Bạn có thể thay đổi kiểu này theo yêu cầu của bạn
      file?: Multer.File; // Định nghĩa thuộc tính file
    }

    // Thêm định nghĩa cho Multer.File
    namespace Multer {
      interface File {
        /** Field name specified in the form */
        fieldname: string;
        /** Name of the file on the user's computer */
        originalname: string;
        /** Encoding type of the file */
        encoding: string;
        /** Mime type of the file */
        mimetype: string;
        /** Size of the file in bytes */
        size: number;
        /** The folder to which the file has been saved */
        destination: string;
        /** The name of the file within the destination */
        filename: string;
        /** Location of the uploaded file */
        path: string;
        /** A Buffer of the entire file */
        buffer: Buffer;
      }
    }
  }
}
