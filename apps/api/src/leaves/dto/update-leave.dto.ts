import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateLeaveDto {
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
}