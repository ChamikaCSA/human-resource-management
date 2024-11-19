import { BACKEND_URL } from "./constants"

export const getPosts = async () => {
  const response = await fetch(`${BACKEND_URL}/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

export const createPost = async (title: string, content: string, authorId: string, createdAt: string) => {
  const response = await fetch(`${BACKEND_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, authorId, createdAt }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
}
