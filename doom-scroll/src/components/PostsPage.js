import { createRef, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateAppToken, selectAccessToken } from "../features/auth/authSlice";
import {
  appendPosts,
  fetchPosts,
  selectPostsChildren,
} from "../features/posts/postsSlice";
import { Posts } from "./Posts";

export const PostsPage = () => {
  const accessToken = useSelector(selectAccessToken);
  const posts = useSelector(selectPostsChildren);

  const location = useLocation();
  const pathname = location.pathname;
  const search = location.search;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateAppToken());
  }, []);

  useEffect(() => {
    if (accessToken) {
      dispatch(
        fetchPosts({
          accessToken: accessToken,
          pathname: pathname,
          search: search,
        })
      );
    }
  }, [location, accessToken]);

  const ref = useRef();

  useEffect(() => {
    const options = {
      rootMargin: "1000px",
    };

    const observer = new IntersectionObserver((entities, observer) => {
      const entity = entities[0];
      if (entity.isIntersecting && accessToken) {
        dispatch(
          appendPosts({
            accessToken: accessToken,
            pathname: pathname,
            search: search,
          })
        );
      }
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [location, accessToken]);

  return (
    <div>
      <Posts posts={posts} />
      <div ref={ref} />
    </div>
  );
};
