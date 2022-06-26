import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { WinkMethods } from "wink-nlp";
import { useAppDispatch } from "../../app/store";
import PostComponent from "../../components/PostComponent/PostComponent";
import PostPlaceholder from "../../components/PostPlaceholder/PostPlaceholder";
import SubredditSort from "../../components/SubredditSort/SubredditSort";
import { selectAccessToken } from "../../features/auth/authSlice";
import {
    loadPosts,
    loadPostsAfter,
    selectPostDeque,
    selectPostsAfter,
    selectPostsIsLoading,
    selectPostsIsRefreshing,
    setPathname as setPostsPathname,
    setSearch as setPostsSearch,
} from "../../features/posts/postSlice";

type Props = {
    nlp: WinkMethods;
};

const PostsPage: React.FC<Props> = ({ nlp }) => {
    const location = useLocation();
    const accessToken = useSelector(selectAccessToken);
    const postDeque = useSelector(selectPostDeque);
    const isRefreshing = useSelector(selectPostsIsRefreshing);
    const isLoading = useSelector(selectPostsIsLoading);
    const after = useSelector(selectPostsAfter);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPostsPathname(location.pathname));
        dispatch(setPostsSearch(location.search));
    }, [dispatch, location]);

    useEffect(() => {
        if (!isRefreshing) {
            dispatch(loadPosts());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, location, accessToken]);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isLoading && after !== null) {
            const options = {
                rootMargin: "5000px",
            };

            const observer = new IntersectionObserver((entities) => {
                const entity = entities[0];
                if (entity.isIntersecting) {
                    dispatch(loadPostsAfter());
                }
            }, options);

            if (ref.current) observer.observe(ref.current);

            const refCopy = ref;
            return () => {
                if (refCopy.current) observer.unobserve(refCopy.current);
            };
        }

        return;
    }, [dispatch, isLoading, after]);

    return (
        <div className="px-16 py-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <SubredditSort />
            </div>
            <div>
                {!isRefreshing &&
                    Object.keys(postDeque.data)
                        .map(Number)
                        .map((id, index) => (
                            <div className="my-4" key={index}>
                                <PostComponent id={id} nlp={nlp} />
                            </div>
                        ))}
            </div>
            {(isLoading || after !== null) && <PostPlaceholder />}
            <div ref={ref} />
        </div>
    );
};

export default PostsPage;
