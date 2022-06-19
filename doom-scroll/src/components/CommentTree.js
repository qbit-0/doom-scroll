import { Comment } from "./Comment";
import { More } from "./More";

export const CommentTree = ({ comments, baseDepth, treeStartIndex }) => {
  if (comments.length === 0) {
    return;
  }

  const branches = [];
  let branch = {
    branchStartIndex: treeStartIndex,
    branchComments: [comments[0]],
  };
  for (let i = 1; i < comments.length; i++) {
    const comment = comments[i];
    if (comment.data.depth === baseDepth) {
      branches.push(branch);
      branch = {
        branchStartIndex: treeStartIndex + i,
        branchComments: [comments[i]],
      };
    } else {
      branch.branchComments.push(comments[i]);
    }
  }
  branches.push(branch);

  const renderComment = (comment, commentStartIndex) => {
    switch (comment.kind) {
      case "more": {
        return <More more={comment} startIndex={commentStartIndex} />;
      }
      case "t1": {
        return <Comment comment={comment} />;
      }
      default: {
        throw Error("Illegal kind");
      }
    }
  };

  const renderBranch = (branch, key) => {
    const branchStartIndex = branch.branchStartIndex;
    const branchComments = branch.branchComments;
    const branchBaseComment = branchComments[0];
    const branchReplies = branchComments.slice(1, branchComments.length);

    return (
      <div
        key={key}
        className="overflow-hidden mt-4 border-t-2 border-l-2 border-solid border-amber-100 rounded-tl-2xl"
      >
        {renderComment(branchBaseComment, branchStartIndex)}
        <div className="pl-4">
          {branchReplies.length > 0 && (
            <CommentTree
              comments={branchReplies}
              baseDepth={baseDepth + 1}
              treeStartIndex={branchStartIndex + 1}
            />
          )}
        </div>
      </div>
    );
  };

  const renderBranches = (branches) => {
    return branches.map((branch, index) => renderBranch(branch, index));
  };

  return <div>{renderBranches(branches, treeStartIndex)}</div>;
};
