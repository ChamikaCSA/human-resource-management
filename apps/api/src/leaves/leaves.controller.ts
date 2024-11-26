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

@Controller('leaves')
@UseGuards(JwtAuthGuard)
export class LeavesController {
  constructor(private readonly leavesService: LeavesService) {}

  @Get()
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ): Promise<{ leaves: LeaveModel[]; total: number }> {
    return this.leavesService.findAll(page, limit);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createLeaveDto: CreateLeaveDto): Promise<LeaveModel> {
    return this.leavesService.create(createLeaveDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() updateLeaveDto: UpdateLeaveDto,
  ): Promise<LeaveModel> {
    return this.leavesService.update(id, updateLeaveDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.leavesService.delete(id);
  }
}
