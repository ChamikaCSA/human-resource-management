import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LeavesService } from './leaves.service';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { Leave as LeaveModel } from '@prisma/client';
import { Roles } from '../roles/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from '../roles/roles.guard';

@Controller('leaves')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LeavesController {
  constructor(private readonly leavesService: LeavesService) {}

  @Get()
  async findAll(@Query('userId') userId: string): Promise<{ leaves: LeaveModel[]; total: number }> {
    return this.leavesService.getAllLeaves(userId);
  }

  @Get('subordinates')
  @Roles(Role.Supervisor)
  async findSubordinateLeaves(@Query('supervisorId') supervisorId: string): Promise<{ leaves: LeaveModel[] }> {
    return this.leavesService.getSubordinateLeaves(supervisorId);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createLeaveDto: CreateLeaveDto): Promise<LeaveModel> {
    return this.leavesService.addLeave(createLeaveDto);
  }

  @Post(':id/approve')
  @Roles(Role.Supervisor)
  async approveLeave(@Param('id') id: string): Promise<void> {
    return this.leavesService.approveLeaveRequest(id);
  }

  @Post(':id/reject')
  @Roles(Role.Supervisor)
  async rejectLeave(@Param('id') id: string): Promise<void> {
    return this.leavesService.rejectLeaveRequest(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() updateLeaveDto: UpdateLeaveDto,
  ): Promise<LeaveModel> {
    return this.leavesService.modifyLeave(id, updateLeaveDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.leavesService.removeLeave(id);
  }

  @Get('balance/:userId')
  async getLeaveBalance(@Param('userId') userId: string): Promise<{ medical: number, casual: number }> {
    return this.leavesService.getUserLeaveBalance(userId);
  }
}
