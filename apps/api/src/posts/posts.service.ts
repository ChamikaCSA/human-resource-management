import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number, limit: number): Promise<{ posts: Post[], total: number }> {
    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        include: {
          author: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: skip,
        take: limit,
      }),
      this.prisma.post.count(),
    ]);
    return { posts, total };
  }

  async create(createPostDto: CreatePostDto) {
    const { title, content, authorId, ...optionalFields } = createPostDto;
    return this.prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: { id: authorId },
        },
        ...optionalFields,
        createdAt: optionalFields.createdAt ? new Date(optionalFields.createdAt) : undefined,
      },
    });
  }
}
