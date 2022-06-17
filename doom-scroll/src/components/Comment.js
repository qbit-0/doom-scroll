import { Link } from "react-router-dom";
import { Comments } from "./Comments";

export const Comment = ({ comment }) => {
  const renderMore = () => {
    const count = comment.data.count;

    if (count === 0) {
      return <button to="#">Continue this thread</button>;
    } else
      return (
        <button to="#">{`${count} more ${
          comment.data.count > 1 ? "replies" : "reply"
        }`}</button>
      );
  };

  if (comment.kind === "more") {
    return renderMore(comment);
  }

  const renderReplies = (comment) => {
    if (comment.data.replies === undefined) return;

    const replies = comment.data.replies;
    if (replies === "") return;

    return <Comments comments={replies.data.children} />;
  };

  return (
    <div className="p-2 mt-4 mr-0 mb-4 ml-2 border-t-2 border-l-2 border-solid border-blue-600">
      <p>{comment.data.body}</p>
      {renderReplies(comment)}
    </div>
  );
};
