import { IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty() name: string;
  @IsNotEmpty() legal_name: string;
  @IsNotEmpty() ein: string;
}
