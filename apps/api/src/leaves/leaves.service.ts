import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';

@Injectable()
export class LeavesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllLeaves(userId: string): Promise<{ leaves: any[], total: number }> {
    const [leaves, total] = await Promise.all([
      this.prisma.leave.findMany({ where: { userId } }),
      this.prisma.leave.count({ where: { userId } }),
    ]);
    return { leaves, total };
  }

  private calculateLeaveDuration(startDate: Date, startDateStartTime: string, startDateEndTime: string, endDate: Date, endDateStartTime: string, endDateEndTime: string): number {
    const startStart = new Date(`${startDate.toISOString().split('T')[0]}T${startDateStartTime}`);
    const startEnd = new Date(`${startDate.toISOString().split('T')[0]}T${startDateEndTime}`);
    const endStart = new Date(`${endDate.toISOString().split('T')[0]}T${endDateStartTime}`);
    const endEnd = new Date(`${endDate.toISOString().split('T')[0]}T${endDateEndTime}`);

    if (startDate.toISOString().split('T')[0] === endDate.toISOString().split('T')[0]) {
      return (startEnd.getTime() - startStart.getTime()) / (1000 * 60 * 60 * 8);
    } else {
      const startDuration = (startEnd.getTime() - startStart.getTime()) / (1000 * 60 * 60 * 8);
      const endDuration = (endEnd.getTime() - endStart.getTime()) / (1000 * 60 * 60 * 8);
      const daysDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) - 1;
      return startDuration + endDuration + daysDiff;
    }
  }

  async addLeave(createLeaveDto: CreateLeaveDto) {
    const { leaveType, startDate, startDateStartTime, startDateEndTime, endDate, endDateStartTime, endDateEndTime, comments, status, userId } = createLeaveDto;
    const duration = this.calculateLeaveDuration(new Date(startDate), startDateStartTime, startDateEndTime, new Date(endDate), endDateStartTime, endDateEndTime);
    const leave = await this.prisma.leave.create({
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
        duration,
      },
    });
    await this.updateLeaveBalanceAfterCreateOrUpdate(userId, leaveType, duration);
    return leave;
  }

  async modifyLeave(id: string, updateLeaveDto: UpdateLeaveDto): Promise<any> {
    const leave = await this.prisma.leave.findUnique({ where: { id } });
    if (!leave) {
      throw new NotFoundException(`Leave with ID ${id} not found`);
    }
    const oldDuration = leave.duration;
    const newDuration = this.calculateLeaveDuration(new Date(updateLeaveDto.startDate), updateLeaveDto.startDateStartTime, updateLeaveDto.startDateEndTime, new Date(updateLeaveDto.endDate), updateLeaveDto.endDateStartTime, updateLeaveDto.endDateEndTime);
    const durationDiff = Math.abs(newDuration - oldDuration);
    const updatedLeave = await this.prisma.leave.update({
      where: { id },
      data: {
        ...updateLeaveDto,
        duration: newDuration,
      },
    });
    await this.updateLeaveBalanceAfterCreateOrUpdate(updatedLeave.userId, updatedLeave.leaveType, durationDiff);
    return updatedLeave;
  }

  async removeLeave(id: string): Promise<void> {
    const leave = await this.prisma.leave.findUnique({ where: { id } });
    if (!leave) {
      throw new NotFoundException(`Leave with ID ${id} not found`);
    }
    await this.prisma.leave.delete({
      where: { id },
    });
    await this.updateLeaveBalanceAfterDelete(leave.userId, leave.leaveType, leave.duration);
  }

  async getSubordinateLeaves(supervisorId: string): Promise<{ leaves: any[] }> {
    const leaves = await this.prisma.leave.findMany({
      where: {
        user: {
          supervisorId,
        },
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return { leaves: leaves.map(leave => ({ ...leave, userName: leave.user.firstName + ' ' + leave.user.lastName })) };
  }

  async approveLeaveRequest(id: string): Promise<void> {
    const leave = await this.prisma.leave.findUnique({ where: { id } });
    if (!leave) {
      throw new NotFoundException(`Leave with ID ${id} not found`);
    }
    await this.prisma.leave.update({
      where: { id },
      data: { status: 'Approved' },
    });
  }

  async rejectLeaveRequest(id: string): Promise<void> {
    const leave = await this.prisma.leave.findUnique({ where: { id } });
    if (!leave) {
      throw new NotFoundException(`Leave with ID ${id} not found`);
    }
    await this.prisma.leave.update({
      where: { id },
      data: { status: 'Rejected' },
    });
    await this.updateLeaveBalanceAfterDelete(leave.userId, leave.leaveType, leave.duration);
  }

  async getUserLeaveBalance(userId: string): Promise<{ medical: number, casual: number }> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return {
      medical: user.leaveBalanceMedical,
      casual: user.leaveBalanceCasual,
    };
  }

  private async updateLeaveBalanceAfterCreateOrUpdate(userId: string, leaveType: string, duration: number): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    if (leaveType === 'Medical') {
      await this.prisma.user.update({
        where: { id: userId },
        data: { leaveBalanceMedical: user.leaveBalanceMedical - duration },
      });
    } else if (leaveType === 'Casual') {
      await this.prisma.user.update({
        where: { id: userId },
        data: { leaveBalanceCasual: user.leaveBalanceCasual - duration },
      });
    }
  }

  private async updateLeaveBalanceAfterDelete(userId: string, leaveType: string, duration: number): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    if (leaveType === 'Medical') {
      await this.prisma.user.update({
        where: { id: userId },
        data: { leaveBalanceMedical: user.leaveBalanceMedical + duration },
      });
    } else if (leaveType === 'Casual') {
      await this.prisma.user.update({
        where: { id: userId },
        data: { leaveBalanceCasual: user.leaveBalanceCasual + duration },
      });
    }
  }
}