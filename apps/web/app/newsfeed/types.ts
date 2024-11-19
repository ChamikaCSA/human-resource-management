import { User } from "@prisma/client";

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
}