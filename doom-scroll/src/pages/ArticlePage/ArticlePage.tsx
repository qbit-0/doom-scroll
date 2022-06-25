import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { WinkMethods } from "wink-nlp";
import { useAppDispatch } from "../../app/store";
import PostComponent from "../../components/PostComponent/PostComponent";
import PostPlaceholder from "../../components/PostPlaceholder/PostPlaceholder";
import ReplyTree from "../../components/ReplyTree/ReplyTree";
import {
  loadArticle,
  selectArticle,
  selectIsLoadingNew,
  setArticleId,
  setSearch,
  setSubreddit,
} from "../../features/article/articleSlice";
import { selectAccessToken } from "../../features/auth/authSlice";

type Props = {
  nlp: WinkMethods;
};

const ArticlePage: React.FC<Props> = ({ nlp }) => {
  const location = useLocation();
  const { subreddit, articleId } = useParams();
  const accessToken = useSelector(selectAccessToken);
  const article = useSelector(selectArticle);
  const isLoadingNew = useSelector(selectIsLoadingNew);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (subreddit !== undefined) {
      dispatch(setSubreddit(subreddit));
    }
    if (articleId !== undefined) {
      dispatch(setArticleId(articleId));
    }
    dispatch(setSearch(location.search));
  }, [subreddit, articleId, location]);

  useEffect(() => {
    if (accessToken) {
      dispatch(loadArticle(nlp));
    }
  }, [accessToken]);

  if (article === null) {
    return <></>;
  }
  const post = article.data.post;
  return (
    <div className="px-28 py-8">
      <div>
        {!isLoadingNew && post && <PostComponent post={post} nlp={nlp} />}
        {isLoadingNew && <PostPlaceholder />}
      </div>
      {!isLoadingNew && (
        <div className="pt-16">
          <ReplyTree replyRoot={article.data.replyRoot} nlp={nlp} />
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
