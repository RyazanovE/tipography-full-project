import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GuestTokenMiddleware } from './middlewares/guest-token.middleware';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
app.use(cookieParser()); // Обязательно
app.use(new GuestTokenMiddleware().use);
  app.enableCors({
    origin: process.env.API_BASE_URL_PRODUCTION ?? 'http://185.105.111.233:4000',
    credentials: true
  });
  
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
