"use client";

import { useEffect, useState } from "react";
import { getPosts, createPost } from "../../lib/posts";
import { Post } from "../newsfeed/types";
import PostCard from "../../components/post-card";

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
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User not logged in");
      }
      await createPost(
        newPostTitle,
        newPostContent,
        userId,
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

  const handleBlur = () => {
    if (!newPostTitle && !newPostContent) {
      setIsCreatingPost(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-10 py-6 max-w-screen-lg">
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
                onBlur={handleBlur}
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
                onBlur={handleBlur}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-gray-500">
        &copy; {new Date().getFullYear()} HRM System. All rights reserved.
      </footer>
    </div>
  );
};

export default Newsfeed;