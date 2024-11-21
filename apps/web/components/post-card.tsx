import { Post } from "@/app/buzz/types";
import { useState } from "react";
import { FaEye, FaHeart, FaComment, FaShare } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const PostCard = ({ post }: { post: Post }) => {
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);
  const [shared, setShared] = useState(false);

  return (
    <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white rounded-lg overflow-hidden flex flex-col">
      <PostCardHeader post={post} />
      <PostCardContent post={post} />
      <PostCardFooter
        post={post}
        liked={liked}
        setLiked={setLiked}
        commented={commented}
        setCommented={setCommented}
        shared={shared}
        setShared={setShared}
      />
    </Card>
  );
};

export default PostCard;

export const PostCardSkeleton = () => (
  <Card className="shadow-lg bg-gray-200 rounded-lg overflow-hidden flex flex-col animate-pulse">
    <Skeleton className="bg-teal-500 h-[85px] w-full" />
    <div className="p-4 flex-grow">
      <Skeleton className="h-10 bg-gray-300 mb-3 w-3/4" />
      <Skeleton className="h-4 bg-gray-300 mb-2 w-full" />
      <Skeleton className="h-4 bg-gray-300 mb-2 w-5/6" />
      <Skeleton className="h-4 bg-gray-300 mb-2 w-4/6" />
    </div>
    <Skeleton className="h-[68px] bg-gray-300 w-full" />
  </Card>
);

const PostCardHeader = ({ post }: { post: Post }) => (
  <CardHeader className="bg-teal-500 text-white p-4">
    <div className="flex items-center">
      <Avatar>
        <AvatarImage
          src={`https://www.gravatar.com/avatar/${post.author.id.slice(0, 8)}?d=identicon`}
          alt={post.author.firstName}
        />
        <AvatarFallback>
          {post.author.firstName[0]}
          {post.author.lastName[0]}
        </AvatarFallback>
      </Avatar>
      <div className="ml-3">
        <h6 className="text-lg font-semibold">
          {post.author.firstName} {post.author.lastName}
        </h6>
        <span className="text-sm">
          {new Date(post.createdAt).toLocaleDateString()}{" "}
          {new Date(post.createdAt).toLocaleTimeString()}
        </span>
      </div>
    </div>
  </CardHeader>
);

const PostCardContent = ({ post }: { post: Post }) => (
  <CardContent className="p-4 flex-grow">
    <h5 className="text-xl font-bold mb-2 text-teal-900">{post.title}</h5>
    <p className="text-teal-700 mb-4">
      {post.content.length > 100
        ? `${post.content.substring(0, 100)}...`
        : post.content}
      {post.content.length > 100 && (
        <a href={`/posts/${post.id}`} className="text-teal-500 ml-2">
          Read more
        </a>
      )}
    </p>
  </CardContent>
);

const PostCardFooter = ({
  post,
  liked,
  setLiked,
  commented,
  setCommented,
  shared,
  setShared,
}: any) => (
  <CardFooter className="flex justify-between text-neutral-500 text-sm p-4 bg-gray-100">
    <Button
      variant="ghost"
      onClick={() => setLiked(!liked)}
      className={`flex items-center ${liked ? "text-red-500" : "text-neutral-500"} hover:text-red-500`}
    >
      <FaHeart
        className={`w-4 h-4 mr-1 ${liked ? "text-red-500" : "text-neutral-500"}`}
      />
      <span>{post.likes}</span>
    </Button>
    <Button
      variant="ghost"
      onClick={() => setCommented(!commented)}
      className={`flex items-center ${commented ? "text-green-500" : "text-neutral-500"} hover:text-green-500`}
    >
      <FaComment
        className={`w-4 h-4 mr-1 ${commented ? "text-green-500" : "text-neutral-500"}`}
      />
      <span>{post.comments}</span>
    </Button>
    <Button
      variant="ghost"
      onClick={() => setShared(!shared)}
      className={`flex items-center ${shared ? "text-blue-500" : "text-neutral-500"} hover:text-blue-500`}
    >
      <FaShare
        className={`w-4 h-4 mr-1 ${shared ? "text-blue-500" : "text-neutral-500"}`}
      />
      <span>{post.shares}</span>
    </Button>
    <Button
      variant="ghost"
      className="flex items-center hover:text-neutral-700"
    >
      <FaEye className="w-4 h-4 mr-1 text-neutral-500" />
      <span>{post.views}</span>
    </Button>
  </CardFooter>
);
