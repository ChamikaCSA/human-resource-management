import { IsEmail, IsNotEmpty, IsDateString, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDateString()
  @IsNotEmpty()
  birthDate: string;

  @IsPhoneNumber(null)
  @IsNotEmpty()
  phoneNumber: string;
}
