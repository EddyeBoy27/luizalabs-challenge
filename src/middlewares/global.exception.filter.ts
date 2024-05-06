import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const errorHandled =
      exception instanceof HttpException
        ? exception.getResponse()
        : {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: 'Internal server error',
          };

    console.error(
      `Global Exception Filter
        statusCode: ${status},
        timestamp: ${new Date().toISOString()},
        path: ${request.url},
        message: Internal server error`,
    );

    response.status(status).json(errorHandled);
  }
}
