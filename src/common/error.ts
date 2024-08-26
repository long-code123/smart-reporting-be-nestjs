export const StatusCode = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    MOVED_PERMANENTLY: 301,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    REQUEST_TIMEOUT: 408,
    GONE: 410,
    PAYLOAD_TOO_LARGE: 413,
    UNSUPPORTED_MEDIA_TYPE: 415,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
  };
  
  export class AppError extends Error {
    public statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.name = 'AppError';
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export class BadRequestError extends AppError {
    constructor(message: string = 'Bad Request') {
      super(message, StatusCode.BAD_REQUEST);
      this.name = 'BadRequestError';
    }
  }
  
  export class UnauthorizedError extends AppError {
    constructor(message: string = 'Unauthorized') {
      super(message, StatusCode.UNAUTHORIZED);
      this.name = 'UnauthorizedError';
    }
  }
  
  export class NotFoundError extends AppError {
    constructor(message: string = 'Not Found') {
      super(message, StatusCode.NOT_FOUND);
      this.name = 'NotFoundError';
    }
  }
  
  export class InternalServerError extends AppError {
    constructor(message: string = 'Internal Server Error') {
      super(message, StatusCode.INTERNAL_SERVER_ERROR);
      this.name = 'InternalServerError';
    }
  }
  
  export class ServiceUnavailableError extends AppError {
    constructor(message: string = 'Service Unavailable') {
      super(message, StatusCode.SERVICE_UNAVAILABLE);
      this.name = 'ServiceUnavailableError';
    }
  }
  