import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsArray,
  IsEmail,
  IsNumberString,
} from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty({
    message: 'სახელის ველი არ შეიძლება იყოს ცარიელი',
  })
  @IsString()
  firstname: string;

  @IsNotEmpty({
    message: 'გვარის ველი არ შეიძლება იყოს ცარიელი',
  })
  @IsString()
  lastname: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  birth_date?: string;

  @IsString()
  @IsOptional()
  contact_person?: string;

  @IsString()
  @IsOptional()
  org_name?: string;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsString()
  @IsNotEmpty({
    message: '',
  })
  contact_status?: string;

  @IsString()
  @IsNotEmpty({
    message: '',
  })
  contact_type?: string;

  @IsString()
  @IsOptional()
  source?: string;

  @IsNumberString()
  @IsOptional()
  user?: number;

  // @IsArray()
  // @IsOptional()
  // state?: Array<any>;
}