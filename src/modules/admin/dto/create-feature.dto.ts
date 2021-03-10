import { IsNotEmpty } from 'class-validator';

export class CreateFeatureDto {
  @IsNotEmpty() name: string;
  description: string;
  @IsNotEmpty() quantity: number;
  @IsNotEmpty() price: number;
  @IsNotEmpty() visible: boolean;
}
