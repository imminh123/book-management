import * as dotenv from 'dotenv';
dotenv.config();

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.BASE_URL);
  app.enableCors();
  app.setGlobalPrefix(process.env.BASE_URL);
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );

  const documentBuilder = new DocumentBuilder()
    .setTitle('Media Service')
    .setDescription('Media API description')
    .setVersion('1.0')
    .addServer(`http://${process.env.SERVER_HOST_NAME}${process.env.BASE_URL}`)
    .build();
  const document = SwaggerModule.createDocument(app, documentBuilder, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup(process.env.DOCS_BASE_URL, app, document);

  await app.listen(process.env.SERVER_PORT);
}

bootstrap().then(() => {
  Logger.log(
    `Service start on http://${process.env.SERVER_HOST_NAME}${process.env.BASE_URL}`,
  );
  Logger.log(
    `Docs available on http://${process.env.SERVER_HOST_NAME}${process.env.DOCS_BASE_URL}`,
  );
});
