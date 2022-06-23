import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  selectAccessToken,
  updateAppToken,
} from "../../features/auth/authSlice";
import {
  loadPosts,
  loadPostsAfter,
  selectIsLoadingPosts,
  selectIsLoadingPostsAfter,
  selectPosts,
  setPostsLocation,
} from "../../features/posts/postsSlice";
import { Post } from "../Post/Post";
import { PostPlaceholder } from "../PostPlaceholder/PostPlaceholder";
import { SubredditSort } from "../SubredditSort/SubredditSort";

export const SubredditPage = ({ nlp }) => {
  const location = useLocation();
  const accessToken = useSelector(selectAccessToken);
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoadingPosts);
  const isLoadingAfter = useSelector(selectIsLoadingPostsAfter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateAppToken());
  }, []);

  useEffect(() => {
    dispatch(setPostsLocation(location));
  }, [location]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(loadPosts(nlp));
    }
  }, [location, accessToken]);

  const ref = useRef();

  useEffect(() => {
    if (!isLoading) {
      const options = {
        rootMargin: "0px",
      };

      const observer = new IntersectionObserver((entities, observer) => {
        const entity = entities[0];
        if (entity.isIntersecting) {
          dispatch(loadPostsAfter(nlp));
        }
      }, options);

      if (ref.current) observer.observe(ref.current);

      return () => {
        if (ref.current) observer.unobserve(ref.current);
      };
    }
  }, [location, accessToken, isLoading]);

  return (
    <div className="px-16 py-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <SubredditSort />
      </div>
      <div>
        {!isLoading && posts.map((post, index) => (
          <Post post={post} nlp={nlp} key={index} />
        ))}
      </div>
      {(isLoading || isLoadingAfter) && <PostPlaceholder />}
      <div ref={ref} />
    </div>
  );
};
