import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class GuestTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const cookies = req.cookies || {};
    const guestToken = cookies['guest_token'];
    const accessToken = cookies['access_token'];
    const jwtSecret = process.env.JWT_SECRET as string;

    let guestId: string;

    if (accessToken) {
      res.cookie('guest_token', '', { maxAge: 0 });
      return next();
    }

    if (!guestToken) {
      guestId = Math.floor(Math.random() * 1e16).toString();
      const token = jwt.sign({ guestId }, jwtSecret, { expiresIn: '7d' });

      res.cookie('guest_token', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    } else {
      try {
        const payload = jwt.verify(guestToken, jwtSecret) as { guestId: string };
        guestId = payload.guestId;
      } catch {
        guestId = Math.floor(Math.random() * 1e16).toString();
        const token = jwt.sign({ guestId }, jwtSecret, { expiresIn: '7d' });
        res.cookie('guest_token', token, {
          httpOnly: true,
          // secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
      }
    }

    (req as any).guest = { id: guestId };
    next();
  }
}
