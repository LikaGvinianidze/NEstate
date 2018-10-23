import { IsNotEmpty, IsOptional, MinLength, MaxLength, IsAlphanumeric } from 'class-validator';

export class CreateRoleDto {
  @IsAlphanumeric({
    message: 'სახელი უნდა შეიცავდეს მხოლოდ რიცხვებსა და სიმბოლოებს',
  })
  @MaxLength(50, {
    message: 'სახელი უნდა შედგებოდეს მაქსიმუმ 50 სიმბოლოსაგან',
  })
  @MinLength(2, {
    message: 'სახელი უნდა შედგებოდეს მინიმუმ 2 სიმბოლოსაგან',
  })
  @IsNotEmpty({
    message: 'სახელის ველი აუცილებელია',
  })
  name: string;

  @IsAlphanumeric({
    message: 'აღწერა უნდა შეიცავდეს მხოლოდ რიცხვებსა და სიმბოლოებს',
  })
  @IsOptional()
  description?: string;
}
