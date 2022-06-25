import { More } from "./redditDataStructures";
import { parseArticle, parsePostsListing, parseReplyListing } from "./redditParse";

const REDDIT_ACCESS_TOKEN_URL = "https://www.reddit.com/api/v1/access_token";
const CLIENT_ID = "LAo7rLD7LwxNjuyP3V5-1w";
const APP_ONLY_GRANT_TYPE = "https://oauth.reddit.com/grants/installed_client";
const DO_NOT_TRACK_THIS_DEVICE = "DO_NOT_TRACK_THIS_DEVICE";

const REDDIT_FETCH_BASE_URL = "https://oauth.reddit.com";

export const getAppToken = async () => {
  const url = new URL(REDDIT_ACCESS_TOKEN_URL);

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${window.btoa(`${CLIENT_ID}:`)}`,
  };

  const body = new URLSearchParams();
  body.append("grant_type", APP_ONLY_GRANT_TYPE);
  body.append("device_id", DO_NOT_TRACK_THIS_DEVICE);

  const response = await fetch(url.href, {
    method: "POST",
    headers: headers,
    body: body,
  });

  const json = await response.json();

  return json;
};

export const fetchReddit = async (
  accessToken: string,
  pathname: string,
  search: string
) => {
  const url = new URL(`${REDDIT_FETCH_BASE_URL}${pathname}`);

  const params = new URLSearchParams(search);
  params.append("raw_json", "1");

  const stringUrl = `${url.href}?${params.toString()}`;

  const headers = {
    Authorization: `bearer ${accessToken}`,
  };

  const response = await fetch(stringUrl, {
    method: "GET",
    headers: headers,
  });

  const json = await response.json();
  return json;
};

export const fetchSubredditPosts = async (
  accessToken: string,
  subreddit: string,
  search: string
) => {
  const json = await fetchReddit(accessToken, `/r/${subreddit}`, search);
  return parsePostsListing(json);
};

export const fetchSearchPosts = async (accessToken: string, search: string) => {
  const json = await fetchReddit(accessToken, "/search", search);
  return parsePostsListing(json);
};

export const fetchArticle = async (
  accessToken: string,
  subreddit: string,
  article: string,
  search: string
) => {
  const json = await fetchReddit(
    accessToken,
    `/r/${subreddit}/comments/${article}/`,
    search
  );
  return parseArticle(json);
};

export const fetchMoreJson = async (
  accessToken: string,
  children: string,
  articleId: string,
  search: string
) => {
  const params = new URLSearchParams(search);
  params.append("api_type", "json");
  params.append("children", children);
  params.append("link_id", articleId);

  const json = await fetchReddit(
    accessToken,
    "/api/morechildren",
    params.toString()
  );

  return json;
};

export const fetchMore = async (
  accessToken: string,
  articleId: string,
  search: string,
  more: More
) => {
  const json = await fetchMoreJson(
    accessToken,
    more.replyIds.join(","),
    articleId,
    search
  );

  const currentReplyPath = more.meta.replyPath;
  const parentReplyPath = currentReplyPath.slice(
    0,
    currentReplyPath.length - 1
  );
  const currentReplyIndex = currentReplyPath[currentReplyPath.length - 1];
  return parseReplyListing(
    json.json.data.things,
    parentReplyPath,
    currentReplyIndex
  );
};

export const fetchProfileImg = async (accessToken: string, author: string) => {
  const json = await fetchReddit(accessToken, `/user/${author}/about`, "");

  return json.data.icon_img;
};
