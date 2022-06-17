import { Post } from "./Post";

export const Posts = ({ posts }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
};
