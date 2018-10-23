import { IsString, IsNotEmpty, IsOptional, IsNumberString } from 'class-validator';
import { IsObject, IsNumber } from './../../../common/utils/decorators/validation decorators';

export class CreateStateDto {
  @IsNotEmpty()
  @IsNumberString()
  transaction_type: number;

  @IsNotEmpty()
  @IsNumberString()
  state_type: number;

  @IsNotEmpty()
  @IsNumberString()
  municipality: number;

  @IsNumberString()
  @IsOptional()
  village: number;

  @IsString()
  @IsOptional()
  street: string;

  @IsNotEmpty()
  @IsNumberString()
  area: number;

  @IsNotEmpty()
  @IsNumberString()
  area_type: number;

  @IsNotEmpty()
  @IsNumberString()
  price: number;

  @IsNotEmpty()
  @IsNumberString()
  price_type: number;

  // @IsNotEmpty()
  @IsNumberString()
  @IsOptional()
  currency: number;

  @IsString()
  @IsOptional()
  comment: string;

  @IsObject()
  @IsOptional()
  features?: object;

  /*
    Additional Information
  */

  @IsNumberString()
  @IsOptional()
  floor?: number;

  @IsNumberString()
  @IsOptional()
  floors_quantity?: number;

  @IsNumberString()
  @IsOptional()
  rooms_quantity?: number;

  @IsNumberString()
  @IsOptional()
  bedrooms_quantity?: number;

  @IsString()
  @IsOptional()
  restrooms_quantity?: string;

  @IsNumberString()
  @IsOptional()
  condition?: number;

  @IsNumberString()
  @IsOptional()
  project?: number;

  @IsNumber()
  @IsOptional()
  ceiling_height?: number;

  @IsNumberString()
  @IsOptional()
  balcony?: number;

  @IsString()
  @IsOptional()
  cadastral_code?: string;

  @IsNumberString()
  @IsOptional()
  balcony_area?: number;

  @IsNumberString()
  @IsOptional()
  veranda_area?: number;

  @IsNumberString()
  @IsOptional()
  loggie_area?: number;

  // @IsNumberString()
  @IsOptional()
  owner?: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  flat_type?: string;

  @IsString()
  @IsOptional()
  exchange?: string;
}
