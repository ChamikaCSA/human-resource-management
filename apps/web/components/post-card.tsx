import { Post } from "@/app/newsfeed/types";
import { useState } from "react";
import { FaEye, FaHeart, FaComment, FaShare } from "react-icons/fa";

const PostCard = ({ post }: { post: Post }) => {
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);
  const [shared, setShared] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg p-6 shadow-sm bg-white hover:shadow-md transition flex flex-col justify-between">
      <div>
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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4 overflow-hidden overflow-ellipsis">
          {post.content.length > 100
            ? `${post.content.substring(0, 100)}...`
            : post.content}
          {post.content.length > 100 && (
            <a href={`/posts/${post.id}`} className="text-blue-500 ml-2">
              Read more
            </a>
          )}
        </p>
      </div>
      <div className="flex items-center justify-between text-gray-500 text-sm">
        <button className="flex items-center" onClick={() => setLiked(!liked)}>
          <FaHeart className={`w-4 h-4 mr-1 ${liked ? "text-red-500" : ""}`} />
          {post.likes}
        </button>
        <button className="flex items-center" onClick={() => setCommented(!commented)}>
          <FaComment className={`w-4 h-4 mr-1 ${commented ? "text-blue-500" : ""}`} />
          {post.comments}
        </button>
        <button className="flex items-center" onClick={() => setShared(!shared)}>
          <FaShare className={`w-4 h-4 mr-1 ${shared ? "text-green-500" : ""}`} />
          {post.shares}
        </button>
        <div className="flex items-center">
          <FaEye className="w-4 h-4 mr-1" />
          {post.views}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
