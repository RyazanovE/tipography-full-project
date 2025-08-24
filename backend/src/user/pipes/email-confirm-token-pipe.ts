import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateTokenPipe implements PipeTransform {
  transform(value: string) {
    if (!value || typeof value !== 'string' || value.length < 10) {
      throw new BadRequestException('Некорректный токен');
    }
    return value;
  }
}
