import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import jwtConfig from '../config/jwt.config';
import { AuthJwtPayload } from '../types/auth-jwtPayload';
import { AuthService } from '../auth.service';
import { Request } from 'express';

const accessTokenExtractor = (req: Request): string | null => {
  const cookies = req.cookies || {};
  const token = cookies['access_token'];

  return token || null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    @Inject(jwtConfig.KEY) private jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {
    if (!jwtConfiguration.secret) {
      throw new Error('JWT secret is not defined');
    }
    super({ 
      jwtFromRequest: ExtractJwt.fromExtractors([accessTokenExtractor]),
      secretOrKey: jwtConfiguration.secret,
    });
  }
  

  validate(payload: AuthJwtPayload) {
    const userId = payload.sub;

    return this.authService.validateJwtUser(userId);
  }
}