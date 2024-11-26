import { IsEmail, IsNotEmpty, IsDateString, IsPhoneNumber, MinLength, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { Role } from '../../roles/roles.enum';

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
  @MinLength(8)
  password: string;

  @IsOptional()
  jobTitle: string = "N/A";

  @IsOptional()
  department: string = "N/A";

  @IsOptional()
  employmentType: string = "N/A";

  @IsOptional()
  workLocation: string = "N/A";

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;

  @IsUUID()
  @IsOptional()
  supervisorId?: string;
}