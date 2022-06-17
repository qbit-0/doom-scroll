import { Comment } from "./Comment";
import { Post } from "./Post";

export const Listing = ({ listing }) => {
  if (listing === undefined || listing === null) {
    return;
  }

  const children = listing.data.children;

  const renderChildren = (children) => {
    return children.map((child, index) => {
      switch (child.kind) {
        case "Listing":
          return <Listing key={index} listing={child} />;
        case "t1":
          return <Comment key={index} comment={child} />;
        case "t3":
          return <Post key={index} post={child} />;
        default:
          break;
      }
    });
  };

  return <div>{renderChildren(children)}</div>;
};
