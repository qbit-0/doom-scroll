import { useAppDispatch } from "App/store";
import {
    loadArticle,
    selectCommentsIsRefreshing,
    selectCommentsPost,
} from "features/article/articleSlice";
import { selectAccessToken, updateAppToken } from "features/auth/authSlice";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "components/Button/Button";
import Post from "components/Post/Post";
import PostPlaceholder from "components/PostPlaceholder/PostPlaceholder";
import ReplyTree from "components/ReplyTree/ReplyTree";

type Props = {};

const Article: React.FC<Props> = () => {
    const location = useLocation();
    const accessToken = useSelector(selectAccessToken);
    const post = useSelector(selectCommentsPost);
    const isRefreshing = useSelector(selectCommentsIsRefreshing);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken === null) {
            dispatch(updateAppToken());
        }
    }, [dispatch, accessToken]);

    const scrollToTop = () => {
        window.scroll(0, 0);
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
        <div className="min-h-screen bg-neutral-900">
            <div className="mx-auto max-w-7xl px-2 py-2 sm:px-16">
                <div className="mt-2">
                    <Button onClick={() => navigate(-1)}>Back</Button>
                </div>

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
                    <div className="mt-8">
                        <ReplyTree />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Article;
