"use client";

import { useEffect, useState } from "react";
import { signOut, isLoggedIn } from "../../lib/auth";
import { createPost, getPosts } from "../../lib/posts";
import { Post } from "./types";
import PostCard, { PostCardSkeleton } from "../../components/post-card";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PaginationWrapper } from "../../components/pagination-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

const BuzzPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [error, setError] = useState("");
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    const { posts: fetchedPosts, total } = await getPosts(page, limit);
    setPosts(fetchedPosts);
    setTotalPosts(total);
    setLoading(false);
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

  const handleClickOutside = (event: MouseEvent) => {
    const cardElement = document.getElementById("create-post-card");
    if (cardElement && !cardElement.contains(event.target as Node)) {
      handleBlur();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    signOut();
    window.location.href = "/";
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <div className="container mx-auto px-10 py-6 max-w-screen-lg">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-2xl font-bold text-teal-700">Buzz Newsfeed</h4>
        <Button
          onClick={handleSignOut}
          variant="default"
          color="destructive"
          className="bg-teal-500 hover:bg-teal-600 text-white"
        >
          Sign Out
        </Button>
      </div>
      {isLoggedIn() && (
        <PostCreationForm
          handleCreatePost={handleCreatePost}
          error={error}
          newPostTitle={newPostTitle}
          setNewPostTitle={setNewPostTitle}
          newPostContent={newPostContent}
          setNewPostContent={setNewPostContent}
          isCreatingPost={isCreatingPost}
          setIsCreatingPost={setIsCreatingPost}
        />
      )}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: limit }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
      <PaginationWrapper
        page={page}
        setPage={setPage}
        totalItems={totalPosts}
        limit={limit}
      />
      <footer className="mt-10 text-center text-teal-500">
        &copy; {new Date().getFullYear()} TealHRM. All rights reserved.
      </footer>
    </div>
  );
};

export default BuzzPage;

const PostCreationForm = ({
  handleCreatePost,
  error,
  newPostTitle,
  setNewPostTitle,
  newPostContent,
  setNewPostContent,
  isCreatingPost,
  setIsCreatingPost,
}: any) => (
  <Card
    id="create-post-card"
    className="mb-6 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden"
  >
    <CardHeader className="bg-teal-500 text-white p-4">
      <h6 className="text-lg font-semibold">Create a New Post</h6>
    </CardHeader>
    <CardContent className="p-4">
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleCreatePost} className="space-y-4">
        <Input
          type="text"
          placeholder="Title"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          onFocus={() => setIsCreatingPost(true)}
          required
          className="w-full"
        />
        {isCreatingPost && (
          <>
            <Textarea
              placeholder="Content"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              required
              className="w-full"
              rows={5}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="default"
                color="primary"
                className="bg-teal-500 hover:bg-teal-600 text-white"
              >
                Post
              </Button>
            </div>
          </>
        )}
      </form>
    </CardContent>
  </Card>
);
