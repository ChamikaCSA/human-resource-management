import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserModel[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.findOne(id);
  }
}
