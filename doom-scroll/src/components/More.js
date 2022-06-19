import { useDispatch } from "react-redux";
import { replaceComment } from "../features/comments/commentsSlice";

export const More = ({ more, startIndex }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();

    dispatch(
      replaceComment({
        index: startIndex,
        childrenIds: more.data.children,
      })
    );
  };

  const renderButton = (count) => {
    if (count <= 0) {
      return <button onClick={handleClick}>Continue this thread</button>;
    } else
      return (
        <button onClick={handleClick}>{`${count} more ${
          count > 1 ? "replies" : "reply"
        }`}</button>
      );
  };

  return (
    <div>
      {renderButton(more.data.count)}
    </div>
  );
};
