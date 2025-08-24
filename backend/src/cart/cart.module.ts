import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartItem } from './entities/cart_item.entity';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem])],
  controllers: [CartController],
  providers: [CartService, FileService],
  exports: [CartService],
})
export class CartModule {}
