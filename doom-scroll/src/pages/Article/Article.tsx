import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import ReplyTreeComponent from "../../components/comments/ReplyTreeComponent/ReplyTreeComponent";
import PostComponent from "../../components/post/PostComponent/PostComponent";
import PostPlaceholder from "../../components/post/PostPlaceholder/PostPlaceholder";
import { selectAccessToken } from "../../features/auth/authSlice";
import {
    loadArticle,
    selectCommentsIsRefreshing,
    setComentsPathname as setCommentsPathname,
    setCommentsSearch,
} from "../../features/comments/commentsSlice";
import { selectPostDeque } from "../../features/posts/postsSlice";
import PostDequeUtils from "../../lib/reddit/postDequeUtils";

type Props = {};

const Article: React.FC<Props> = () => {
    const location = useLocation();
    const accessToken = useSelector(selectAccessToken);
    const postDeque = useSelector(selectPostDeque);
    const isRefreshing = useSelector(selectCommentsIsRefreshing);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setCommentsPathname(location.pathname));
        dispatch(setCommentsSearch(location.search));
    }, [dispatch, location]);

    useEffect(() => {
        if (accessToken) {
            dispatch(loadArticle());
        }
    }, [dispatch, accessToken]);

    const post = PostDequeUtils.peekTop(postDeque);

    return (
        <div className="bg-zinc-900 text-amber-100">
            <div className="px-28 py-8 ">
                <div>
                    {!isRefreshing && post !== undefined && (
                        <PostComponent post={post} />
                    )}
                    {isRefreshing && <PostPlaceholder />}
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
