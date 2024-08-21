// src/types/express.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Bạn có thể thay đổi kiểu này theo yêu cầu của bạn
    }
  }
}
