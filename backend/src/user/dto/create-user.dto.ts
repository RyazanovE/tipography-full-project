import { z } from 'zod';
import {
  IsEmail,
  IsObject,
  IsString,
} from 'class-validator';

export const CreateUserSchema = z
  .object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(6),
  })
  .strict()
  .required();

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsObject()
  address: {
    city: string;
    street: string;
    house: string;
    room: string;
    comment: string;
  };
}

export type CreateUserDtoType = z.infer<typeof CreateUserSchema>;
