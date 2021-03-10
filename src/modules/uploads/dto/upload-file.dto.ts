import { IsNotEmpty } from 'class-validator';

export class UploadFileDto {
  @IsNotEmpty() dataBuffer: Buffer;
  @IsNotEmpty() filename: string;
  @IsNotEmpty() mineType: string;
  @IsNotEmpty() path: string;
}
