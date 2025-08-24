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
    origin: 'http://localhost:3000',
    credentials: true
  });
  
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
