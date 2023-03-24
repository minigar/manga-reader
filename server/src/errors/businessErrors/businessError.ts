import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

export class BusinessError extends HttpException {
  constructor(errorMap: string | Record<string, any>) {
    super(errorMap, HttpStatus.OK);
  }
}

@Catch(BusinessError)
export class BusinessErrorFilter implements ExceptionFilter<BusinessError> {
  catch(exception: BusinessError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: exception.message,
    });
  }
}
