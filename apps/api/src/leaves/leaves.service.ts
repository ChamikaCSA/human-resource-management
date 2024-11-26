import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';

@Injectable()
export class LeavesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number): Promise<{ leaves: any[], total: number }> {
    const skip = (page - 1) * limit;
    const [leaves, total] = await Promise.all([
      this.prisma.leave.findMany({
        skip: skip,
        take: limit,
      }),
      this.prisma.leave.count(),
    ]);
    return { leaves, total };
  }

  async create(createLeaveDto: CreateLeaveDto) {
    const { leaveType, startDate, startDateStartTime, startDateEndTime, endDate, endDateStartTime, endDateEndTime, comments, status, userId } = createLeaveDto;
    return this.prisma.leave.create({
      data: {
        leaveType,
        startDate: new Date(startDate),
        startDateStartTime,
        startDateEndTime,
        endDate: new Date(endDate),
        endDateStartTime,
        endDateEndTime,
        comments,
        status,
        userId,
      },
    });
  }

  async update(id: string, updateLeaveDto: UpdateLeaveDto): Promise<any> {
    const leave = await this.prisma.leave.findUnique({ where: { id } });
    if (!leave) {
      throw new NotFoundException(`Leave with ID ${id} not found`);
    }
    return this.prisma.leave.update({
      where: { id },
      data: {
        ...updateLeaveDto,
      },
    });
  }

  async delete(id: string): Promise<void> {
    const leave = await this.prisma.leave.findUnique({ where: { id } });
    if (!leave) {
      throw new NotFoundException(`Leave with ID ${id} not found`);
    }
    await this.prisma.leave.delete({
      where: { id },
    });
  }
}