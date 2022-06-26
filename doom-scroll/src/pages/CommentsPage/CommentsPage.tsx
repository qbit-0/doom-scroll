import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { WinkMethods } from "wink-nlp";
import { useAppDispatch } from "../../app/store";
import PostComponent from "../../components/PostComponent/PostComponent";
import PostPlaceholder from "../../components/PostPlaceholder/PostPlaceholder";
import ReplyTree from "../../components/ReplyTreeComponent/ReplyTreeComponent";
import { selectAccessToken } from "../../features/auth/authSlice";
import {
    loadArticle,
    selectCommentsIsRefreshing,
    selectCommentsPost, setComentsPathname as setCommentsPathname,
    setCommentsSearch
} from "../../features/comments/commentsSlice";

type Props = {
    nlp: WinkMethods;
};

const CommentsPage: React.FC<Props> = ({ nlp }) => {
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
                    <PostComponent id={0} nlp={nlp} />
                )}
                {isRefreshing && <PostPlaceholder />}
            </div>
            {!isRefreshing && (
                <div className="pt-16">
                    <ReplyTree nlp={nlp} />
                </div>
            )}
        </div>
    );
};

export default CommentsPage;
