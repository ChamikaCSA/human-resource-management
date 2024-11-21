import { BACKEND_URL } from "./constants";

export const getPosts = async (page: number, limit: number) => {
  const response = await fetch(`${BACKEND_URL}/posts?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await response.json();
  return {
    posts: data.posts,
    total: data.total,
  };
};

export const createPost = async (title: string, content: string, authorId: string, createdAt: string) => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${BACKEND_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ title, content, authorId, createdAt }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
};
