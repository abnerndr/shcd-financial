/* eslint-disable @typescript-eslint/no-floating-promises */
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './infrastructure/swagger/swagger.config';
import { ResponseInterceptor } from './interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  initSwagger(app);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 80;
  await app.listen(port, () =>
    Logger.debug(`Server is running on port ${port}`),
  );
}
bootstrap();
