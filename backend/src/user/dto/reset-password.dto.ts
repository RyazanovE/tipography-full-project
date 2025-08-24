import { IsEmail, IsString, Length } from 'class-validator';

export class ConfirmResetPasswordDto {
  @IsString()
  @Length(8, 32)
  newPassword: string;

  @IsString()
  token: string;
}

export class ResetPasswordDto {
  @IsString()
  @IsEmail()
  email: string;
}
