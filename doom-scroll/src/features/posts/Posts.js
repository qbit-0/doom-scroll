import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../components/Post/Post";
import { PostPlaceholder } from "../../components/PostPlaceholder/PostPlaceholder";
import {
  retrieveAppAccessToken,
  selectAppAccessToken,
  selectUserAccessToken,
} from "../auth/authSlice";
import {
  loadMorePosts,
  loadPosts,
  selectHasError,
  selectIsLoading,
  selectPosts,
} from "./postsSlice";

export const Posts = ({ pathname, params }) => {
  const dispatch = useDispatch();

  const appAccessToken = useSelector(selectAppAccessToken);
  const userAccessToken = useSelector(selectUserAccessToken);
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoading);
  const hasError = useSelector(selectHasError);

  useEffect(() => {
    if (userAccessToken || appAccessToken) {
      dispatch(
        loadPosts({
          pathname: pathname,
          params: params,
        })
      );
    } else {
      dispatch(retrieveAppAccessToken());
    }
  }, [appAccessToken, userAccessToken, pathname, params]);

  const containerRef = useRef(null);

  const options = {
    root: null,
    rootMargin: "5000px",
    threshold: 0,
  };

  useEffect(() => {
    if (userAccessToken || appAccessToken) {
      const observer = new IntersectionObserver((entries, observer) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          dispatch(
            loadMorePosts({
              pathname: pathname,
              params: params,
            })
          );
          entry.unobserve(entry.target);
        }
      }, options);

      if (containerRef.current && !isLoading) {
        observer.observe(containerRef.current);
      }

      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    }
  }, [appAccessToken, userAccessToken, isLoading]);

  return (
    <div>
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
      {isLoading && <PostPlaceholder />}
      <div ref={containerRef}></div>
    </div>
  );
};
