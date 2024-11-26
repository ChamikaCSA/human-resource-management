import { Controller, Get, Post, Body, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Param, Put, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostModel } from '@prisma/client';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10
  ): Promise<{ posts: PostModel[], total: number }> {
    return this.postsService.findAll(page, limit);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async create(@Body() createPostDto: CreatePostDto): Promise<PostModel> {
    return this.postsService.create(createPostDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto): Promise<PostModel> {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<void> {
    return this.postsService.delete(id);
  }
}
