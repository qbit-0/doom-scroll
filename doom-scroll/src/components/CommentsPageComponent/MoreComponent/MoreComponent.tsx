import React, { MouseEvent, MouseEventHandler } from "react";
import { useAppDispatch } from "../../../app/store";
import {
    loadMore
} from "../../../features/comments/commentsSlice";
import { More } from "../../../reddit/redditData";

type Props = {
    more: More;
};

const MoreComponent: React.FC<Props> = ({ more }) => {
    const dispatch = useAppDispatch();

    const handleClick: MouseEventHandler = (event: MouseEvent) => {
        event.preventDefault();
        dispatch(loadMore(more));
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
