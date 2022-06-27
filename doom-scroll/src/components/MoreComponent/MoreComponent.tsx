import { useAppDispatch } from "app/store";
import { loadMore } from "features/comments/commentsSlice";
import { More } from "lib/reddit/redditData";
import { borderDepthColors } from "lib/utils/replyDepthColors";
import React, { MouseEvent, MouseEventHandler } from "react";

type Props = {
    more: More;
};

const MoreComponent: React.FC<Props> = ({ more }) => {
    const dispatch = useAppDispatch();

    const handleClick: MouseEventHandler = (event: MouseEvent) => {
        event.preventDefault();
        dispatch(loadMore(more));
    };

    let moreMsg;
    if (more.data.count <= 0) {
        moreMsg = "Continue this thread";
    } else {
        moreMsg =
            more.data.count > 1
                ? `${more.data.count} more replies`
                : `${more.data.count} more reply`;
    }

    const borderDepthColor =
        borderDepthColors[more.data.depth % borderDepthColors.length];

    return (
        <button
            onClick={handleClick}
            className={`w-fit border-b-2 ${borderDepthColor} text-amber-100`}
        >
            <p>{moreMsg}</p>
        </button>
    );
};

export default MoreComponent;
