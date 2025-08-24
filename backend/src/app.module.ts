import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import dbConfig from './config/db.config';
import dbConfigProduction from './config/db.config.production';
import { EmailModule } from './email/email.module';
import { ScheduleModule } from '@nestjs/schedule';
import { OrderModule } from './orders/orders.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [dbConfig, dbConfigProduction]
    }),
    UsersModule, 
    TypeOrmModule.forRootAsync({useFactory: process.env.NODE_ENV === 'production' ? dbConfigProduction : dbConfig}), 
    AuthModule, 
    EmailModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

