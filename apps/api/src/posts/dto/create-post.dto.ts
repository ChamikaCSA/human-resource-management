import { User } from '@prisma/client';
import { IsNotEmpty, IsString, IsBoolean, IsInt, IsArray, IsOptional, IsDateString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  authorId: User['id'];

  @IsOptional()
  @IsInt()
  views?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsDateString()
  createdAt?: string;
}
