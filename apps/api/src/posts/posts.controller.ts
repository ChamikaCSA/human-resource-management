import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostModel } from '@prisma/client';


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(): Promise<PostModel[]> {
    return this.postsService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createPostDto: CreatePostDto): Promise<PostModel> {
    return this.postsService.create(createPostDto);
  }
}
