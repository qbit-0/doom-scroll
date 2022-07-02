import { useAppDispatch } from "App/store";
import { selectAccessToken, updateAppToken } from "features/auth/authSlice";
import {
    loadArticle,
    selectCommentsIsRefreshing,
    selectCommentsPost,
} from "features/article/articleSlice";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";

import Post from "components/Post/Post";
import PostPlaceholder from "components/PostPlaceholder/PostPlaceholder";
import ReplyTree from "components/ReplyTree/ReplyTree";
import Button from "components/Button/Button";

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

    const refTop = useRef<HTMLDivElement>(null);

    const scrollToTop = () => {
        if (refTop.current === null) return;

        window.scroll({
            top: refTop.current.offsetTop,
            behavior: "auto",
        });
    };

    useEffect(() => {
        scrollToTop();
    }, []);

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
            <div className="mx-auto max-w-7xl px-2 py-2 sm:px-16">
                <Button onClick={() => navigate(-1)}>Back</Button>

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
