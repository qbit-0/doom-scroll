import { useLocation } from "react-router-dom";
import { Posts } from "../../features/posts/Posts";

export const PostsPage = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const params = new URLSearchParams(location.search);

  return (
    <div>
      <Posts pathname={pathname || "r/popular"} params={params}/>
    </div>
  );
};
