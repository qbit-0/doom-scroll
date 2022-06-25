import React, { MouseEvent } from "react";
import { MouseEventHandler } from "react";
import { useDispatch } from "react-redux";
import { WinkMethods } from "wink-nlp";
import { useAppDispatch } from "../../app/store";
import { loadMore } from "../../features/article/articleSlice";
import { More } from "../../reddit/redditDataStructures";

type Props = {
  more: More;
  nlp: WinkMethods;
};

const MoreComponent: React.FC<Props> = ({ more, nlp }) => {
  const dispatch = useAppDispatch();

  const handleClick: MouseEventHandler = (event: MouseEvent) => {
    event.preventDefault();

    dispatch(
      loadMore({
        replacePath: more.meta.replyPath,
        nlp: nlp,
      })
    );
  };

  const renderButton = (count: number) => {
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

export default MoreComponent;
