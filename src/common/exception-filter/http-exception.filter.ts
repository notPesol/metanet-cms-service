import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    let exResponse = exception.getResponse();
    if (typeof exResponse === 'string') {
      exResponse = { message: exResponse };
    } else {
      exResponse = { ...exResponse };
    }

    response.status(status).json({
      ...exResponse,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
