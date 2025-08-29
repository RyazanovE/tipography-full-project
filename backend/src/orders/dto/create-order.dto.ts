import { z } from 'zod';
import { IsEmail, IsString } from 'class-validator';

export const CreateOrderSchema = z
  .object({
    email: z.string().email(),
  })
  .strict()
  .required();

export class CreateOrderDto {
  clientInfo: {
    fio: string;
    phone: string;
    email: string;
  };
  deliveryInfo: {
    deliveryMethod: 1 | 2;
    address: {
      city: string;
      street: string;
      house: string;
      room: string;
      comment: string;
    } | null;
    tkInfo: { address: string } | null;
  };
}

export type CreateOrderDtoType = z.infer<typeof CreateOrderSchema>;
