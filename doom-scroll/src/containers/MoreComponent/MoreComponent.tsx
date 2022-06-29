import { useAppDispatch } from "App/store";
import Button, { ButtonStyle } from "components/Button/Button";
import { loadMore } from "features/comments/commentsSlice";
import { MoreData } from "lib/reddit/redditData";
import { borderDepthColors } from "lib/utils/replyDepthColors";
import React, { MouseEvent, MouseEventHandler, useState } from "react";

type Props = {
    more: MoreData;
};

const MoreComponent: React.FC<Props> = ({ more }) => {
    const [isClicked, setIsClicked] = useState(false);
    const dispatch = useAppDispatch();

    const handleClick: MouseEventHandler = (event: MouseEvent) => {
        event.preventDefault();
        dispatch(loadMore(more));
        setIsClicked(true);
    };

    let moreMsg;
    if (isClicked) {
        moreMsg = "loading...";
    } else if (more.data["count"] <= 0) {
        moreMsg = "Continue this thread";
    } else {
        moreMsg =
            more.data["count"] > 1
                ? `${more.data["count"]} more replies`
                : `${more.data["count"]} more reply`;
    }

    const borderDepthColor =
        borderDepthColors[more.data["depth"] % borderDepthColors.length];

    return (
        <Button
            buttonStyle={ButtonStyle.PRIMARY}
            onClick={handleClick}
            borderColor={borderDepthColor}
        >
            <p>{moreMsg}</p>
        </Button>
    );
};

export default MoreComponent;
