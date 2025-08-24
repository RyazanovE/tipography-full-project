import { FileService } from './../file/file.service';
import { Controller, Get, Post, Delete, Body, Param, Req, Patch, UploadedFile, UseInterceptors, UnauthorizedException, UploadedFiles } from '@nestjs/common'
import { CartService } from './cart.service'
import { Public } from 'src/auth/decorators/public.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { extname, join } from 'path';
import { diskStorage } from 'multer';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly fileService: FileService
  ) {}

  @Get()
  getCart(@Req() req) {
    return this.cartService.getUserCart(req.guest?.id, req.user?.id)
  }

  @Get('items-amount')
  getCartItemsAmount(@Req() req) {
    return this.cartService.getCartItemsAmount(req.guest?.id, req.user?.id)
  }


  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFiles() files: { filename: string }[],
    @Body('options') options: string,
    @Req() req
  ) {
    const parsedOptions = JSON.parse(options); 

    this.cartService.addToCart(parsedOptions.type, parsedOptions, files.map(file => file.filename), req.guest?.id, req.user?.id);

    return { message: 'Added to cart uploaded successfully' };
  }

  
  @Patch(':id/edit-quantity')
  editQuantity(@Req() req, @Param('id') id: string, @Body() body: { quantity: number }) {
    return this.cartService.editQuantity(body.quantity, +id,  req.guest?.id, req.user?.id)
  }

  @Delete(':id')
  removeItem(@Req() req, @Param('id') id: string) {
    return this.cartService.removeItem( +id, req.guest?.id, req.user?.id)
  }
  

  @Delete()
  clearCart(@Req() req) {
    if (!req.user) {
      throw new UnauthorizedException();
    };

    return this.cartService.clearCart(req.user.id)
  }
}
