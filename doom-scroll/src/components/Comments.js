import { Comment } from "./Comment";

export const Comments = ({ comments }) => {
  return (
    <div>
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );
};
