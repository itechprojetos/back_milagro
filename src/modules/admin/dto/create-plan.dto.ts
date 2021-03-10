import { IsNotEmpty } from 'class-validator';
import { Feature, Product } from '../entities';

export class CreatePlanDto {
  @IsNotEmpty() type: string;
  @IsNotEmpty() name: string;
  @IsNotEmpty() price: number;
  @IsNotEmpty() total: number;
  @IsNotEmpty() visible: boolean;
  @IsNotEmpty() active: boolean;
  @IsNotEmpty() products: Array<Product[]>;
  @IsNotEmpty() features: Array<Feature[]>;
}
