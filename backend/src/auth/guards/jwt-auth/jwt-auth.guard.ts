import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY, USER_ONLY_KEY } from 'src/auth/decorators/public.decorator';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const userOnly = this.reflector.getAllAndOverride<boolean>(USER_ONLY_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const guestId = context.switchToHttp().getRequest().guest?.id;
    const isGuestFriendly = !!guestId && !userOnly

    if (isPublic || isGuestFriendly) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      if (info instanceof TokenExpiredError) {
        throw new UnauthorizedException('Токен истёк');
      }

      if (info?.message === 'No auth token') {
        throw new UnauthorizedException('Токен не найден');
      }

      throw new UnauthorizedException('Невалидный токен');
    }

    return user;
  }
}
