import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectAccessToken, updateAppToken } from "../features/auth/authSlice";
import { fetchReddit } from "../utility/redditAPI";
import { Post } from "./Post";

export const PostsPage = () => {
  const location = useLocation();
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [after, setAfter] = useState(null);

  useEffect(() => {
    dispatch(updateAppToken());
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchReddit({
        accessToken: accessToken,
        pathname: location.pathname,
        search: location.search,
      }).then((response) => {
        setPosts([...response.data.children]);
        setAfter(response.data.after);
      });
    }
  }, [location, accessToken]);

  const ref = useRef();

  useEffect(() => {
    const options = {
      rootMargin: "0px",
    };

    const observer = new IntersectionObserver((entities, observer) => {
      const entity = entities[0];
      if (entity.isIntersecting && accessToken && after) {
        const params = new URLSearchParams(location.search);
        params.append("after", after);

        fetchReddit({
          accessToken: accessToken,
          pathname: location.pathname,
          search: params.toString(),
        }).then((response) => {
          setPosts([...posts, ...response.data.children]);
          setAfter(response.data.after);
        });
      }
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [location, accessToken, after]);

  return (
    <div>
      {posts.map((post, index) => (
        <Post post={post} key={index} />
      ))}
      <div ref={ref} />
    </div>
  );
};
