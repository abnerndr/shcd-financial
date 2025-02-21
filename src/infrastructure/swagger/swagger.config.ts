/* eslint-disable @typescript-eslint/no-unsafe-return */
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const initSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('shcd')
    .setDescription('Serviço de gerenciamento financeiro pessoal')
    .setVersion('1.0')
    .setContact('SHCD Financial', 'http://shcd.com.br', 'contato@shcd.com.br')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access_token',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
};
