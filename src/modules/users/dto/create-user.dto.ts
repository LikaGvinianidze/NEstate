import {
  MinLength,
  IsEmail,
  MaxLength,
  IsOptional,
  IsNotEmpty,
  IsInt,
  IsString,
  IsNumberString,
} from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateUserDto {
  @IsString({
    message: 'სახელი უნდა შედგებოდეს მხოლოდ ალფავიტის სიმბოლოებისაგან',
  })
  @MinLength(2, {
    message: 'სახელი უნდა შედგებოდეს მინიმუმ 2 სიმბოლოსაგან',
  })
  @IsNotEmpty({
    message: 'სახელის ველი აუცილებელია',
  })
  firstname: string;

  @IsString({
    message: 'გვარი უნდა შედგებოდეს მხოლოდ ალფავიტის სიმბოლოებისაგან',
  })
  @MinLength(2, {
    message: 'გვარის უნდა შედგებოდეს მინიმუმ 2 სიმბოლოსაგან',
  })
  @IsNotEmpty({
    message: 'გვარის ველი აუცილებელია',
  })
  lastname: string;

  @IsEmail({}, {
    message: 'შეიყვანეთ ელ-ფოსტა სწორი ფორმატით',
  })
  @IsNotEmpty({
    message: 'ელ-ფოსტა აუცილებელია',
  })
  email: string;

  @MinLength(5, {
    message: 'პაროლი უნდა შედგებოდეს მინიმუმ 5 სიმბოლოსაგან',
  })
  @MaxLength(20, {
    message: 'პაროლი უნდა შედგებოდეს მაქსიმუმ 20 სიმბოლოსაგან',
  })
  @IsString({
    message: 'პაროლი უნდა შეიცავდეს მხოლოდ რიცხვებსა და/ან სიმბოლოებს',
  })
  @IsNotEmpty({
    message: 'პაროლის ველი აუცილებელია',
  })
  @IsOptional()
  password: string;

  @Transform(value => Number.isNaN(+value) ? 0 : +value)
  @IsInt()
  @IsNotEmpty({
    message: 'გთხოვთ აირჩიოთ როლი',
  })
  role: number;

  @Transform(value => Number.isNaN(+value) ? 0 : +value)
  @IsInt()
  @IsOptional()
  organization: number;

  @MaxLength(9, {
    message: 'ტელეფონის ნომერი უნდა შედგებოდეს მაქსიმუმ 9 სიმბოლოსაგან',
  })
  @MinLength(9, {
    message: 'ტელეფონის ნომერი უნდა შედგებოდეს მინიმუმ 9 სიმბოლოსაგან',
  })
  @IsNumberString({
    message: 'ტელეფონის ნომერი უნდა შეიცავდეს მხოლოდ რიცხვებს',
  })
  @IsOptional()
  phone?: string;
}
