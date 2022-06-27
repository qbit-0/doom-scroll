import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useMatch } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import PostComponent from "../../components/post/PostComponent/PostComponent";
import PostPlaceholder from "../../components/post/PostPlaceholder/PostPlaceholder";
import SearchSort from "../../components/post/SearchSort/SearchSort";
import SubredditSort from "../../components/post/SubredditSort/SubredditSort";
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
} from "../../features/posts/postsSlice";

type Props = {};

const Browse: React.FC<Props> = () => {
    const location = useLocation();
    const searchMatch = useMatch("/search*");
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
        <div className="bg-zinc-900 text-amber-100">
            <div className="px-16 py-8 max-w-7xl mx-auto">
                <div className="mb-8">
                    {searchMatch ? <SearchSort /> : <SubredditSort />}
                </div>
                <div>
                    {!isRefreshing &&
                        Object.values(postDeque.data).map((post, index) => (
                            <div className="my-4" key={index}>
                                <PostComponent post={post} />
                            </div>
                        ))}
                </div>
                {(isLoading || after !== null) && <PostPlaceholder />}
                <div ref={ref} />
            </div>
        </div>
    );
};

export default Browse;