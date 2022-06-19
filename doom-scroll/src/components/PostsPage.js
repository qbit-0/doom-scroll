import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectAccessToken, updateAppToken } from "../features/auth/authSlice";
import {
  loadPosts,
  loadPostsAfter,
  selectPosts,
  setPostsPathname,
  setPostsSearch,
} from "../features/posts/postsSlice";
import { Post } from "./Post";

export const PostsPage = () => {
  const location = useLocation();
  const accessToken = useSelector(selectAccessToken);
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateAppToken());
  }, []);

  useEffect(() => {
    dispatch(setPostsPathname(location.pathname));
    dispatch(setPostsSearch(location.search));
  }, [location]);

  useEffect(() => {
    dispatch(loadPosts());
  }, [location, accessToken]);

  const ref = useRef();

  useEffect(() => {
    const options = {
      rootMargin: "5000px",
    };

    const observer = new IntersectionObserver((entities, observer) => {
      const entity = entities[0];
      if (entity.isIntersecting) {
        dispatch(loadPostsAfter());
      }
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [location, accessToken]);

  return (
    <div>
      <div className="pt-8 px-16">
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
      <div ref={ref} />
    </div>
  );
};
