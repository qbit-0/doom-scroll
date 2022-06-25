import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import ReplyTree from "../../components/ReplyTree/ReplyTree";
import PostComponent from "../../components/PostComponent/PostComponent";
import PostPlaceholder from "../../components/PostPlaceholder/PostPlaceholder";
import {
  selectAccessToken,
  updateAppToken,
} from "../../features/auth/authSlice";
import {
  loadArticle,
  selectIsLoadingNew,
  selectArticle,
  setSubreddit,
  setArticleId,
  setSearch,
} from "../../features/article/articleSlice";
import { useAppDispatch } from "../../app/store";
import { WinkMethods } from "wink-nlp";

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
  const replyRoot = article.data.replyRoot;

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
