import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { WinkMethods } from "wink-nlp";
import { useAppDispatch } from "../../app/store";
import PostComponent from "../../components/PostComponent/PostComponent";
import PostPlaceholder from "../../components/PostPlaceholder/PostPlaceholder";
import SearchSort from "../../components/SearchSort/SearchSort";
import { selectAccessToken } from "../../features/auth/authSlice";
import {
  loadSearchPosts,
  loadSearchPostsAfter,
  selectAfter,
  selectIsLoading,
  selectIsLoadingNew,
  selectPosts,
  setSearch,
} from "../../features/search/searchSlice";

type Props = {
  nlp: WinkMethods;
};

const SearchPage: React.FC<Props> = ({ nlp }) => {
  const location = useLocation();
  const accessToken = useSelector(selectAccessToken);
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoading);
  const isLoadingNew = useSelector(selectIsLoadingNew);
  const after = useSelector(selectAfter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSearch(location.search));
  }, [location]);

  useEffect(() => {
    if (!isLoadingNew) {
      dispatch(loadSearchPosts(nlp));
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
          dispatch(loadSearchPostsAfter(nlp));
        }
      }, options);

      if (ref.current) observer.observe(ref.current);

      return () => {
        if (ref.current) observer.unobserve(ref.current);
      };
    }
  }, [location, accessToken, isLoading, after]);

  return (
    <div className="px-16 py-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <SearchSort />
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

export default SearchPage;
