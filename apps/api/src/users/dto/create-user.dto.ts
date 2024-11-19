import { IsEmail, IsNotEmpty, IsDateString, IsPhoneNumber, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDateString()
  @IsNotEmpty()
  birthDate: Date;

  @IsPhoneNumber(null)
  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  password: string;
}
