import { Posts } from "../../features/posts/Posts";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const Subreddit = () => {
  const { subreddit } = useParams();

  return (
    <div className="subreddit">
      <Posts subreddit={subreddit || "all"} />
    </div>
  );
};
