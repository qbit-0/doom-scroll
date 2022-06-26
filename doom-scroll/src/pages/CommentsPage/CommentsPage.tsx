import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import PostComponent from "../../components/PostsPageComponents/PostComponent/PostComponent";
import PostPlaceholder from "../../components/PostsPageComponents/PostPlaceholder/PostPlaceholder";
import ReplyTree from "../../components/CommentsPageComponent/ReplyTreeComponent/ReplyTreeComponent";
import { selectAccessToken } from "../../features/auth/authSlice";
import {
    loadArticle,
    selectCommentsIsRefreshing,
    selectCommentsPost,
    setComentsPathname as setCommentsPathname,
    setCommentsSearch
} from "../../features/comments/commentsSlice";

type Props = {
};

const CommentsPage: React.FC<Props> = ({}) => {
    const location = useLocation();
    const accessToken = useSelector(selectAccessToken);
    const post = useSelector(selectCommentsPost);
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

    return (
        <div className="px-28 py-8">
            <div>
                {!isRefreshing && post && (
                    <PostComponent post={post} />
                )}
                {isRefreshing && <PostPlaceholder />}
            </div>
            {!isRefreshing && (
                <div className="pt-16">
                    <ReplyTree />
                </div>
            )}
        </div>
    );
};

export default CommentsPage;
