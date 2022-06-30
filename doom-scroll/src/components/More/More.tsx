import { useAppDispatch } from "App/store";
import Button from "components/Button/Button";
import { loadMore } from "features/comments/commentsSlice";
import { MoreData } from "lib/reddit/redditData";
import { borderDepthColors } from "lib/utils/replyDepthColors";
import React, { MouseEvent, MouseEventHandler, useState } from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";

type Props = {
    more: MoreData;
};

const More: React.FC<Props> = ({ more }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);
    const dispatch = useAppDispatch();

    const handleClick: MouseEventHandler = (event: MouseEvent) => {
        event.preventDefault();

        if (more.data["count"] === 0) {
            const parentLinkId = more.data["parent_id"];
            const shortName = parentLinkId.match(/t1_(\w{7})/)[1];
            navigate(shortName);
        } else {
            dispatch(
                loadMore({
                    more: more,
                    pathname: location.pathname,
                    searchStr: location.search,
                })
            );
        }
        setIsClicked(true);
    };

    let moreMsg;
    if (isClicked) {
        moreMsg = "loading...";
    } else if (more.data["count"] === 0) {
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
        <Button onClick={handleClick} borderColor={borderDepthColor}>
            <p>{moreMsg}</p>
        </Button>
    );
};

export default More;
