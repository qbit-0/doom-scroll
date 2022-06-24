import React, { MouseEvent } from "react";
import { MouseEventHandler } from "react";
import { useDispatch } from "react-redux";
import { replaceComment } from "../../features/comments/commentsSlice";

type Props = {
  more: any; //TODO
  startIndex: number;
  nlp: any; //TODO
}

const More: React.FC<Props> = ({ more, startIndex, nlp }) => {
  const dispatch = useDispatch();

  const handleClick: MouseEventHandler = (event: MouseEvent) => {
    event.preventDefault();

    dispatch(
      replaceComment({
        index: startIndex,
        childrenIds: more.data.children,
        nlp: nlp,
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
    <div className="text-amber-100 p-4 mt-4 border-t-2 border-l-2 border-gray-800 rounded-tl-2xl bg-gradient-to-r from-gray-800 to-gray-900">
      {renderButton(more.data.count)}
    </div>
  );
};

export default More;
