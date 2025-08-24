import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserOnly } from 'src/auth/decorators/public.decorator';
import { PaginationQueryDto } from './dto/get-orders.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Req() req, @Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(dto, req.guest?.id, req.user?.id);
  }

  @UserOnly()
  @Get()
  async getAllOrders(@Req() req, @Query() paginationQuery: PaginationQueryDto) {
    return await this.orderService.getOrders(req.user.id, paginationQuery);
  }

  @Post('/fast-order')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async fastOrder(
    @UploadedFiles() files: { filename: string }[],
    @Body()
    dto: {
      phone: string;
      email: string;
      name: string;
      contactMethod: 1 | 2 | 3 | 4;
    },
  ) {
    return await this.orderService.createFastOrder({ ...dto, files });
  }

  @UserOnly()
  @Get('/current')
  async getAllCurrentOrders(
    @Req() req,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    console.log('🚀 ~ OrderController ~ req:', req.user.id)

    return await this.orderService.getAllCurrentOrders(
      req.user.id,
      paginationQuery,
    );
  }

  @UserOnly()
  @Get('/mockups')
  async getMockups(@Req() req) {
    return await this.orderService.getMockups(req.user.id);
  }

  @UserOnly()
  @Get('/history')
  async getOrdersHistory(
    @Req() req,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return await this.orderService.getOrdersHistory(
      req.user.id,
      paginationQuery,
    );
  }

  @Get('/:orderNumber')
  async getOrder(
    @Param('orderNumber') orderNumber: string,
    @Query('email') email: string,
  ) {
    return this.orderService.getOrder(orderNumber, email);
  }
}
