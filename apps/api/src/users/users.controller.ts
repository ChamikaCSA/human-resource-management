import { Controller, Get, Param, Post, Body, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.Supervisor)
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
    @Query('searchQuery') searchQuery?: string,
    @Query('jobTitle') jobTitle?: string,
  ): Promise<{ users: UserModel[]; total: number }> {
    return this.usersService.findAll(page, limit, searchQuery, jobTitle);
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
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    return this.usersService.create(createUserDto);
  }
}
