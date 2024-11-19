import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: { author: true },
      
    });
  }

  async create(createPostDto: CreatePostDto) {
    const { title, content, authorId, views, tags, createdAt } = createPostDto;
    if (!title || !content) {
      throw new BadRequestException('Title and content must not be empty');
    }
    return this.prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: { id: authorId },
        },
        views,
        tags,
        createdAt: createdAt ? new Date(createdAt) : undefined,
      },
    });
  }
}
