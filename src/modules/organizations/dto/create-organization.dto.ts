import { IsNotEmpty, MaxLength, MinLength, IsNumberString, IsString, IsOptional } from 'class-validator';

export class CreateOrganizationDto {

  @IsString({
    message: 'ორგანიზაციის სახელი უნდა შეიცავდეს მხოლოდ რიცხვებსა და/ან სიმბოლოებს',
  })
  @IsNotEmpty({
    message: 'ორგანიზაციის სახელის ველი აუცილებელია',
  })
  name: string;

  @IsString({
    message: 'სახელი უნდა შეიცავდეს მხოლოდ რიცხვებსა და/ან სიმბოლოებს',
  })
  @IsNotEmpty({
    message: 'სახელის ველი აუცილებელია კი?',
  })
  director: string;

  @MaxLength(11, {
    message: 'საიდენტიფიკაციო ნომერი უნდა შედგებოდეს 11 სიმბოლოსაგან',
  })
  @MinLength(11, {
    message: 'საიდენტიფიკაციო ნომერი უნდა შედგებოდეს 11 სიმბოლოსაგან',
  })
  @IsNumberString({
    message: 'საიდენტიფიკაციო ნომერი უნდა შეიცავდეს მხოლოდ რიცხვებს',
  })
  @IsNotEmpty({
    message: 'საიდენტიფიკაციო ნომერი ველი აუცილებელია კი?',
  })
  identity_number: string;

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
