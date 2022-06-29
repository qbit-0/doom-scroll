import { useAppDispatch } from "App/store";
import Post from "components/Post/Post";
import PostPlaceholder from "components/PostPlaceholder/PostPlaceholder";
import ReplyTreeComponent from "components/ReplyTreeComponent/ReplyTreeComponent";
import { selectAccessToken, updateAppToken } from "features/auth/authSlice";
import {
    loadArticle,
    selectCommentsIsRefreshing,
    setCommentsPathname,
    setCommentsSearchStr,
} from "features/comments/commentsSlice";
import { selectPostDeque } from "features/posts/postsSlice";
import PostDequeUtils from "lib/reddit/postDequeUtils";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

type Props = {};

const Article: React.FC<Props> = () => {
    const location = useLocation();
    const accessToken = useSelector(selectAccessToken);
    const postDeque = useSelector(selectPostDeque);
    const isRefreshing = useSelector(selectCommentsIsRefreshing);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (accessToken === null) {
            dispatch(updateAppToken());
        }
    }, [dispatch, accessToken]);

    const refTop = useRef<HTMLDivElement>(null);

    const scrollToTop = () => {
        if (refTop.current === null) return;

        window.scroll({
            top: refTop.current.offsetTop,
            behavior: "auto",
        });
    };

    useEffect(() => {
        if (isRefreshing) return;
        scrollToTop();
        dispatch(setCommentsPathname(location.pathname));
        dispatch(setCommentsSearchStr(location.search));
        dispatch(loadArticle());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, location]);

    useEffect(() => {
        if (isRefreshing) return;
        scrollToTop();
        dispatch(loadArticle());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, accessToken]);

    const post = PostDequeUtils.peekTop(postDeque);

    return (
        <div className="bg-neutral-900 text-amber-100">
            <div ref={refTop} />
            <div className="px-16 pt-28 pb-8 ">
                <div>
                    {!isRefreshing && post !== undefined ? (
                        <div className="my-4">
                            <Post post={post} />
                        </div>
                    ) : (
                        <div className="my-4">
                            <PostPlaceholder />
                        </div>
                    )}
                </div>
                {!isRefreshing && (
                    <div className="pt-16">
                        <ReplyTreeComponent />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Article;
