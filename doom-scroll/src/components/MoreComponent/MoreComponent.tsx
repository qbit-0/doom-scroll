import React, { MouseEvent, MouseEventHandler } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/store";
import {
    loadMore,
    selectCommentsReplyTree
} from "../../features/comments/commentsSlice";

type Props = {
    id: number;
};

const MoreComponent: React.FC<Props> = ({ id }) => {
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
                    <p className="underline">{`${count} more ${
                        count > 1 ? "replies" : "reply"
                    }`}</p>
                </button>
            );
    };

    return (
        <div className={`text-amber-100`}>
            {renderButton(more.data.count)}
        </div>
    );
};

export default MoreComponent;
