import React, { MouseEvent, MouseEventHandler } from "react";
import { useSelector } from "react-redux";
import { WinkMethods } from "wink-nlp";
import { useAppDispatch } from "../../app/store";
import {
    loadMore,
    selectCommentsReplyTree,
} from "../../features/comments/commentsSlice";
import { replyBorderColors } from "../../utils/commentBorderColors";

type Props = {
    id: number;
    nlp: WinkMethods;
};

const MoreComponent: React.FC<Props> = ({ id, nlp }) => {
    const replyTree = useSelector(selectCommentsReplyTree);
    const dispatch = useAppDispatch();

    if (replyTree === null) throw new Error("replyTree is null");

    const more = replyTree.data[id];
    if ("children" in more) throw new Error("more is a Commet");

    const handleClick: MouseEventHandler = (event: MouseEvent) => {
        event.preventDefault();
        dispatch(loadMore(id));
    };

    const renderButton = (count: number) => {
        if (count <= 0) {
            return <button onClick={handleClick}>Continue this thread</button>;
        } else
            return (
                <button onClick={handleClick}>
                    {`${count} more ${count > 1 ? "replies" : "reply"}`}{" "}
                </button>
            );
    };

    const borderColor =
        replyBorderColors[more.data.depth % replyBorderColors.length];

    return (
        <div
            className={`text-amber-100 p-4 mb-2 border-t-2 border-l-2 ${borderColor} rounded-tl-3xl bg-gray-900 shadow-md`}
        >
            {renderButton(more.data.count)}
        </div>
    );
};

export default MoreComponent;
