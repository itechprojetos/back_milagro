import { IsNotEmpty, IsUUID, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty() @IsUUID('all') token: string;
  @IsNotEmpty() @MinLength(8) password: string;
}
