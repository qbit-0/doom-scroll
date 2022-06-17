import { Listing } from "./Listing";

export const Comment = ({ comment }) => {
  if (comment.kind === "more") {
    <div className="p-2 mt-4 mr-0 mb-4 ml-2 border-t-2 border-l-2 border-solid border-blue-600">
      <p>MORE</p>
    </div>;
  }

  const renderReplies = (replies) => {
    if (replies === "") return;
    return <Listing listing={replies} />;
  };

  return (
    <div className="p-2 mt-4 mr-0 mb-4 ml-2 border-t-2 border-l-2 border-solid border-blue-600">
      <p>{comment.data.body}</p>
      {renderReplies(comment.data.replies)}
    </div>
  );
};
