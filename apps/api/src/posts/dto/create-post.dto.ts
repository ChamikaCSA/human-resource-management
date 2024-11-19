import { User } from '@prisma/client';
import { IsNotEmpty, IsString, IsBoolean, IsInt, IsOptional, IsDateString } from 'class-validator';

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
  @IsInt()
  likes?: number;

  @IsOptional()
  @IsInt()
  comments?: number;

  @IsOptional()
  @IsInt()
  shares?: number;

  @IsOptional()
  @IsDateString()
  createdAt?: string;
}
