import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(createUserDto: CreateUserDto) {
    const { email, firstName, lastName, birthDate, phoneNumber } = createUserDto;
    if (!email || !firstName || !lastName || !birthDate || !phoneNumber) {
      throw new BadRequestException('Email, first name, last name, birth date, and phone number are required');
    }
    return this.prisma.user.create({ data: { email, firstName, lastName, birthDate, phoneNumber } });
  }
}
