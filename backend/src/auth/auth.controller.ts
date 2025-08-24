import {
  Controller,
  Post,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Req,
  Response,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.auth/local.auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { Public, UserOnly } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response() res) {
    const { accessToken, refreshToken } = await this.authService.login(
      req.user.id,
      req.guest?.id,
    );

    this.authService.setAuthCookies(res, accessToken, refreshToken);

    return res.send({ message: 'Successfully logged in' });
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshToken(@Request() req, @Response() res) {
    const { accessToken, refreshToken } = await this.authService.refreshToken(
      req.user.id,
    );

    this.authService.setAuthCookies(res, accessToken, refreshToken);

    return res.send({ message: 'Successfully refreshed token' });
  }

  @UserOnly()
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  async signOut(@Req() req, @Response() res) {
    await this.authService.clearCookies(res);
    await this.authService.signOut(req.user.id);

    return res.send({ message: 'Successfully signed out' });
  }
}
