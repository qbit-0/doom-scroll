import { useAppDispatch } from "App/store";
import Post from "components/Post/Post";
import PostPlaceholder from "components/PostPlaceholder/PostPlaceholder";
import ReplyTree from "components/ReplyTree/ReplyTree";
import { selectAccessToken, updateAppToken } from "features/auth/authSlice";
import {
    loadArticle,
    selectCommentsIsRefreshing,
    selectCommentsPost,
} from "features/comments/commentsSlice";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

type Props = {};

const Article: React.FC<Props> = () => {
    const location = useLocation();
    const accessToken = useSelector(selectAccessToken);
    const post = useSelector(selectCommentsPost);
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
        dispatch(
            loadArticle({
                pathname: location.pathname,
                searchStr: location.search,
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, accessToken, location]);

    return (
        <div className="bg-neutral-900 text-amber-100">
            <div ref={refTop} />
            <div className="px-2 sm:px-16 pt-28 pb-8 ">
                <div>
                    {!isRefreshing && post !== null ? (
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
                        <ReplyTree />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Article;
