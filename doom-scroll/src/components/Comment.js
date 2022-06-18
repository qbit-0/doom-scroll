import { More } from "./More";

export const Comment = ({ comment, link, setSelf }) => {
  const replaceChild = (targetIndex, newChilden) => {
    const children = comment.data.replies.data.children;
    const newComment = {
      ...comment,
      data: {
        ...comment.data,
        replies: {
          ...comment.data.replies,
          data: {
            ...comment.data.replies.data,
            children: [
              ...children.slice(0, targetIndex),
              ...newChilden,
              ...children.slice(targetIndex + 1, children.length),
            ],
          },
        },
      },
    };
    setSelf([newComment]);
  };

  const renderReplies = (comment) => {
    if (comment.data.replies === undefined) return;

    const replies = comment.data.replies;
    if (replies === "") return;

    return replies.data.children.map((child, index) => {
      switch (child.kind) {
        case "more":
          return (
            <More
              more={child}
              link={link}
              setSelf={(newChildren) => {
                replaceChild(index, newChildren);
              }}
              key={index}
            />
          );
        case "t1":
          return (
            <Comment
              comment={child}
              link={link}
              setSelf={(newChildren) => {
                replaceChild(index, newChildren);
              }}
              key={index}
            />
          );
      }
    });
  };

  return (
    <div className="p-2 mt-4 mr-0 mb-4 ml-2 border-t-2 border-l-2 border-solid border-blue-600">
      <p>{comment.data.body}</p>
      {renderReplies(comment)}
    </div>
  );
};
