/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

class HttpResponseError {
  statusCode: number;
  error: any;

  constructor(statusCode: number, error: any) {
    this.statusCode = statusCode;
    this.error = error;
  }
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // Informações do Request
    const { method, url, headers: requestHeaders, body: requestBody } = request;
    const requestId = uuid(); // ID único para rastreamento
    const startTime = Date.now(); // Início do processamento

    // Log inicial do Request
    this.logger.debug(`[${requestId}] Incoming Request`, {
      timestamp: new Date().toISOString(),
      method,
      url,
      requestId,
      requestHeaders,
      requestBody: this.formatContent(requestBody),
    });

    return next.handle().pipe(
      // Formatação de resposta de sucesso
      map((data) => ({
        statusCode: response.statusCode || 200,
        message: 'Success',
        data,
        error: null,
      })),
      // Tratamento de erros
      catchError((err) => {
        const executionTime = Date.now() - startTime;
        const statusCode = err.status || err.statusCode || 500;
        const errorDetails = {
          message: err.message || 'Internal server error',
          stack: err.stack || null,
        };
        this.logger.error(`[${requestId}] Error Encountered`, {
          timestamp: new Date().toISOString(),
          requestId,
          method,
          url,
          statusCode,
          executionTime: `${executionTime}ms`,
          errorDetails,
        });
        if (err instanceof HttpException) {
          throw err;
        }
        const httpResponseError = new HttpResponseError(
          statusCode,
          errorDetails.message,
        );
        return throwError(
          () => new HttpException(httpResponseError, statusCode),
        );
      }),
    );
  }

  private formatContent(content: any): any {
    if (!content) return null;

    const contentString = JSON.stringify(content, null, 2);
    return contentString.length > 1000
      ? `${contentString.substring(0, 1000)}... [truncated]`
      : contentString;
  }
}
