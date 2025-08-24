import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmailService } from 'src/email/email.service';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CartModule, 
  ],
  controllers: [UserController],
  providers: [UserService, EmailService],
  exports: [UserService],
})
export class UsersModule {}
