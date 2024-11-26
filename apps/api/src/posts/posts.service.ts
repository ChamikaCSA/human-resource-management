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

  async update(id: string, updatePostDto: CreatePostDto): Promise<Post> {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async delete(id: string): Promise<void> {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    await this.prisma.post.delete({ where: { id } });
  }
}
