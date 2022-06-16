import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../components/Post/Post";
import { selectAppAccessToken, selectUserAccessToken } from "../auth/authSlice";
import {
  loadMorePosts,
  loadPosts,
  selectHasError,
  selectIsLoading,
  selectPosts,
} from "./postsSlice";

export const Posts = ({ subreddit }) => {
  const dispatch = useDispatch();

  const appAccessToken = useSelector(selectAppAccessToken);
  const userAccessToken = useSelector(selectUserAccessToken);
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoading);
  const hasError = useSelector(selectHasError);

  useEffect(() => {
    let accessToken = null;
    if (userAccessToken !== null) {
      accessToken = userAccessToken;
    } else if (appAccessToken !== null) {
      accessToken = appAccessToken;
    }

    if (accessToken !== null) {
      dispatch(loadPosts({ accessToken: accessToken, subreddit: subreddit }));
    }
  }, [appAccessToken, userAccessToken, subreddit]);

  const containerRef = useRef(null);

  const options = {
    root: null,
    rootMargin: "5000px",
    threshold: 0,
  };

  useEffect(() => {
    let accessToken = null;
    if (userAccessToken !== null) {
      accessToken = userAccessToken;
    } else if (appAccessToken !== null) {
      accessToken = appAccessToken;
    }

    if (accessToken !== null) {
      const observer = new IntersectionObserver((entries, observer) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          dispatch(
            loadMorePosts({ accessToken: accessToken, subreddit: subreddit })
          );
        }
      }, options);

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    }
  }, [appAccessToken, userAccessToken]);

  return (
    <div>
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
      <div ref={containerRef}></div>
    </div>
  );
};
