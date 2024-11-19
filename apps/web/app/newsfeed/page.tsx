"use client";

import { useEffect, useState } from "react";
import { getPosts, createPost } from "../../lib/api";
import { User } from "@prisma/client";

interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  views: number;
  tags: string[];
  createdAt: string;
}

const Newsfeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [error, setError] = useState("");
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const fetchPosts = async () => {
    const fetchedPosts = await getPosts();
    setPosts(fetchedPosts);
  };

  const handleCreatePost = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      await createPost(
        newPostTitle,
        newPostContent,
        "1", // TODO: Create a user authentication system and use the logged in user's ID
        new Date().toISOString()
      );
      setNewPostTitle("");
      setNewPostContent("");
      setIsCreatingPost(false);
      fetchPosts();
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Newsfeed</h1>

      {/* Create New Post Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Create a New Post
        </h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {!isCreatingPost ? (
          <button
            onClick={() => setIsCreatingPost(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition"
          >
            Create New Post
          </button>
        ) : (
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-gray-700 font-semibold mb-2"
              >
                Title:
              </label>
              <input
                type="text"
                id="title"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-gray-700 font-semibold mb-2"
              >
                Content:
              </label>
              <textarea
                id="content"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none"
                rows={5}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition"
              >
                Post
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Newsfeed Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-300 rounded-lg p-6 shadow-sm bg-white hover:shadow-md transition"
          >
            <div className="flex items-center mb-4">
              <img
                src={`https://www.gravatar.com/avatar/${post.author.id}?d=identicon`}
                alt={post.author.firstName}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-700">
                  {post.author.firstName} {post.author.lastName}
                </h2>
                <small className="text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </small>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {post.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {post.content.length > 100
                ? `${post.content.substring(0, 100)}...`
                : post.content}
              {post.content.length > 100 && (
                <a href={`/posts/${post.id}`} className="text-blue-500 ml-2">
                  Read more
                </a>
              )}
            </p>
            <div className="flex items-center justify-between text-gray-500 text-sm">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
                </svg>
                {post.views} views
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v10H5V5zm2 2v2h6V7H7zm0 4v2h4v-2H7z" />
                </svg>
                {post.tags.join(", ")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Newsfeed;