import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { BusinessErrorFilter } from './errors/businessErrors/businessError';

const APP_PORT = process.env.APP_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new BusinessErrorFilter());

  app.use(helmet.dnsPrefetchControl());
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.referrerPolicy());
  app.use(helmet.xssFilter());

  app.enableCors();

  app.setGlobalPrefix('v1');

  await app.listen(APP_PORT);
  Logger.log(`Server has been started at ${APP_PORT} port!`);
}

bootstrap();
