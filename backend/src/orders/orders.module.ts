import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './orders.service';
import { OrderController } from './orders.controller';
import { Order } from './entities/order.entity';
import { CartItem } from 'src/cart/entities/cart_item.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { UsersModule } from 'src/user/user.module';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, CartItem]),
    UsersModule
  ],
  controllers: [OrderController],
  providers: [OrderService, EmailService],
  exports: [OrderService],
})
export class OrderModule {}