import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDtoType, CreateUserSchema } from './dto/create-user.dto';
import { UserValidationPipe } from './pipes/user-validation-pipe';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { ValidateTokenPipe } from './pipes/email-confirm-token-pipe';
import { RateLimit } from 'nestjs-rate-limiter';
import {
  ConfirmResetPasswordDto,
  ResetPasswordDto,
} from './dto/reset-password.dto';
import { UserOnly } from 'src/auth/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(new UserValidationPipe(CreateUserSchema))
  create(@Body() dto: CreateUserDtoType, @Req() req) {
    return this.userService.create(dto, req.guest?.id);
  }

  @RateLimit({ points: 5, duration: 60 })
  @Get('confirm')
  async confirmEmail(@Query('token', ValidateTokenPipe) token: string) {
    return this.userService.confirmEmail(token);
  }

  @UserOnly()
  @Patch('')
  update(@Req() req, @Body() dto: UpdateUserDto) {
    return this.userService.update(req.user.id, dto);
  }

  @Roles(Role.ADMIN, Role.EDITOR)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }

  @UserOnly()
  @Get('profile')
  getProfile(@Req() req) {
    return this.userService.findOne(req.user.id);
  }

  @RateLimit({ points: 5, duration: 60 })
  @Post('request-reset')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return await this.userService.resetPassword(dto.email);
  }

  @RateLimit({ points: 5, duration: 60 })
  @Post('confirm-reset')
  async updatePassword(@Body() dto: ConfirmResetPasswordDto) {
    return await this.userService.updatePassword(dto);
  }
}
