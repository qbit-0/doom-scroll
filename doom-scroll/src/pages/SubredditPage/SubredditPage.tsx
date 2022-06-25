import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { WinkMethods } from "wink-nlp";
import { useAppDispatch } from "../../app/store";
import PostComponent from "../../components/PostComponent/PostComponent";
import PostPlaceholder from "../../components/PostPlaceholder/PostPlaceholder";
import SubredditSort from "../../components/SubredditSort/SubredditSort";
import { selectAccessToken } from "../../features/auth/authSlice";
import {
  loadSubredditPosts,
  loadSubredditPostsAfter,
  selectAfter,
  selectIsLoading,
  selectIsLoadingNew,
  selectPosts,
  setSearch,
  setSubreddit,
} from "../../features/subreddit/subredditSlice";

type Props = {
  nlp: WinkMethods;
};

const SubredditPage: React.FC<Props> = ({ nlp }) => {
  const location = useLocation();
  const { subreddit } = useParams();
  const accessToken = useSelector(selectAccessToken);
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoading);
  const isLoadingNew = useSelector(selectIsLoadingNew);
  const after = useSelector(selectAfter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (subreddit !== undefined) {
      dispatch(setSubreddit(subreddit));
    }
  }, [subreddit]);

  useEffect(() => {
    dispatch(setSearch(location.search));
  }, [location]);

  useEffect(() => {
    if (!isLoadingNew) {
      dispatch(loadSubredditPosts(nlp));
    }
  }, [location, accessToken]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && after !== null) {
      const options = {
        rootMargin: "5000px",
      };

      const observer = new IntersectionObserver((entities, observer) => {
        const entity = entities[0];
        if (entity.isIntersecting) {
          dispatch(loadSubredditPostsAfter(nlp));
        }
      }, options);

      if (ref.current) observer.observe(ref.current);

      return () => {
        if (ref.current) observer.unobserve(ref.current);
      };
    }

    return;
  }, [isLoading, after]);

  return (
    <div className="px-16 py-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <SubredditSort />
      </div>
      <div>
        {!isLoadingNew &&
          posts.map((post, index) => (
            <PostComponent post={post} nlp={nlp} key={index} />
          ))}
      </div>
      {after !== null && <PostPlaceholder />}
      <div ref={ref} />
    </div>
  );
};

export default SubredditPage;
