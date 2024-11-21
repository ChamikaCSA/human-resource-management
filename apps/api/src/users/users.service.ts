import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number, limit: number, searchQuery?: string, jobTitle?: string): Promise<{ users: any[]; total: number }> {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (searchQuery) {
      where.OR = [
        { firstName: { contains: searchQuery, mode: 'insensitive' } },
        { lastName: { contains: searchQuery, mode: 'insensitive' } },
      ];
    }

    if (jobTitle) {
      where.jobTitle = jobTitle;
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
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
    return this.prisma.user.create({ data: createUserDto });
  }

  async getJobTitles(): Promise<string[]> {
    const jobTitles = await this.prisma.user.findMany({
      select: {
        jobTitle: true,
      },
      distinct: ['jobTitle'],
      orderBy: {
        jobTitle: 'asc',
      },
    });
    return jobTitles.map(job => job.jobTitle);
  }
}
