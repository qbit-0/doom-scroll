import {
  Article,
  Comment,
  More,
  Post,
  Reply
} from "./redditDataStructures";

/**
 * Parse a Reddit article, containing the post as well as comment replies.
 * @param jsonArticle The object representation of an article.
 * @returns The article.
 */
export const parseArticle = (jsonArticle: any): Article => {
  const post = parsePost(jsonArticle[0].data.children[0]);
  const replies = parseReplyListing(jsonArticle[1], []);

  return {
    data: {
      post: post,
      replyRoot: {
        replies: replies,
      },
    },
    meta: {},
  };
};

/**
 * Parse a Reddit post.
 * @param jsonPost The Reddit post (kind is t3).
 * @returns The post.
 */
export const parsePost = (jsonPost: any): Post => {
  const post: Post = {
    data: {
      name: jsonPost.data.name,
      author: jsonPost.data.author,
      created: jsonPost.data.created_utc,
      subreddit: jsonPost.data.subreddit,
      title: jsonPost.data.title,
      permalink: jsonPost.data.permalink,
      url: jsonPost.data.url_overridden_by_dest,
      score: jsonPost.data.ups,
      ratio: jsonPost.data.upvote_ratio,
    },
    meta: {},
  };
  if ("selftext" in jsonPost.data) {
    post.data.selftext = jsonPost.data.selftext;
  }

  if ("preview" in jsonPost.data) {
    post.data.preview = jsonPost.data.preview.images[0].source.url;
  }

  return post;
};

/**
 * Parse Reddit listings, comments, or mores.
 * @param jsonReplies The Reddit object.
 * @param replyPath The path to reach this object.
 * @param startIndex The index to start from when creating paths for replies. The first time a listing is reached, the startIndex is used as an offset.
 * @returns An array of Replies.
 */
export const parseReply = (
  jsonReplies: any,
  replyPath: number[],
  startIndex = 0
): Reply => {
  switch (jsonReplies.kind) {
    case "t1": {
      return parseComment(jsonReplies, replyPath, startIndex);
    }
    case "more": {
      return parseMore(jsonReplies, replyPath);
    }
    default: {
      throw new Error("Invalid kind");
    }
  }
};
/**
 * Parse a Reddit listing object that is used to store comment replies.
 * @param jsonRepliesListing The Reddit listing object (kind is listing).
 * @param replyPath The path to reach this object.
 * @param startIndex The index to start at when creating paths for replies.
 * @returns An array of Replies.
 */
export const parseReplyListing = (
  jsonRepliesListing: any,
  replyPath: number[],
  startIndex = 0
): Reply[] => {
  return jsonRepliesListing.data.children.map((jsonReply: any, index: number) =>
    parseReply(jsonReply, [...replyPath, startIndex + index])
  );
};

/**
 * Parse a Reddit comment object.
 * @param jsonComment The Reddit comment object (kind is t1).
 * @param replyPath The path to reach this object.
 * @param startIndex The index to start at when creating paths for replies.
 * @returns The comment.
 */
export const parseComment = (
  jsonComment: any,
  replyPath: number[],
  startIndex = 0
): Comment => {
  const comment: Comment = {
    data: {
      name: jsonComment.data.name,
      author: jsonComment.data.author,
      created: jsonComment.data.created_utc,
      body: jsonComment.data.body,
      score: jsonComment.data.score,
    },
    meta: {
      replyPath: replyPath,
    },
    replies: [],
  };

  const replies = jsonComment.data.replies;
  if (replies !== "") {
    comment.replies = parseReplyListing(replies, replyPath, startIndex);
  }

  return comment;
};

/**
 * Parse a Reddit more object.
 * @param jsonMore The Reddit more object (kind is more).
 * @param replyPath The path to reach this object.
 * @returns The more object.
 */
export const parseMore = (jsonMore: any, replyPath: number[]): More => {
  const more: More = {
    data: {
      count: jsonMore.data.count,
    },
    meta: {
      replyPath: replyPath,
    },
    replyIds: jsonMore.data.children,
  };
  return more;
};

/**
 * Parse a listing of posts.
 * @param jsonPostsListing The Reddit listing of posts.
 * @returns An array of Posts.
 */
export const parsePostsListing = (jsonPostsListing: any): Post[] => {
  return jsonPostsListing.data.children.map(parsePost);
};
