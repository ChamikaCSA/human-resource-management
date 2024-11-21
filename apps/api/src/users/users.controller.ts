import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('searchQuery') searchQuery: string,
    @Query('jobTitle') jobTitle: string,
  ): Promise<{ users: UserModel[]; total: number }> {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    return this.usersService.findAll(pageNumber, limitNumber, searchQuery, jobTitle);
  }

  @Get('job-titles')
  async getJobTitles(): Promise<string[]> {
    return this.usersService.getJobTitles();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    return this.usersService.create(createUserDto);
  }
}
