// src/filters/custom-exception.filter.ts
import { Catch, ExceptionFilter, ArgumentsHost, BadRequestException } from '@nestjs/common';

@Catch(BadRequestException) // Capture apenas BadRequestException
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    const message = exception.getResponse() as string;

    response.status(400).json(message);
  }
}
