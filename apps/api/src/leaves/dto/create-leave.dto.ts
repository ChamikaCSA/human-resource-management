import { IsString, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLeaveDto {
  @IsString()
  @IsNotEmpty()
  leaveType: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  startDateStartTime: string;

  @IsString()
  @IsNotEmpty()
  startDateEndTime: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  endDateStartTime: string;

  @IsString()
  @IsNotEmpty()
  endDateEndTime: string;

  @IsString()
  @IsNotEmpty()
  comments: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
