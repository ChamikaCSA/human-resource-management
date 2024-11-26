import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '../roles/roles.enum';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number, limit: number, searchQuery?: string, jobTitle?: string): Promise<{ users: any[]; total: number }> {
    const skip = (page - 1) * limit;
    const where: Prisma.UserWhereInput = {
      ...(searchQuery && {
        OR: [
          { firstName: { contains: searchQuery, mode: 'insensitive' } },
          { lastName: { contains: searchQuery, mode: 'insensitive' } },
        ],
      }),
      ...(jobTitle && { jobTitle }),
    };

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.user.count({ where }),
    ]);

    return { users, total };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.role === Role.Subordinate && !createUserDto.supervisorId) {
      throw new BadRequestException('Subordinates must have a supervisor');
    }
    return this.prisma.user.create({ data: createUserDto });
  }

  async getJobTitles(): Promise<string[]> {
    const jobTitles = await this.prisma.user.findMany({
      select: { jobTitle: true },
      where: { jobTitle: { not: '' } },
      distinct: ['jobTitle'],
      orderBy: { jobTitle: 'asc' },
    });
    return jobTitles.map(job => job.jobTitle);
  }
}
