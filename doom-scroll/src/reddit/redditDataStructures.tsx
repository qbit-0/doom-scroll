/**
 * Represents a reddit post and its comments.
 */
export type Article = {
  data: {
    post: Post;
    replyRoot: ReplyRoot;
  };
  meta: {};
};

/**
 * Represents a Reddit post.
 */
export type Post = {
  data: {
    name: string;
    author: string;
    created: number;
    subreddit: string;
    title: string;
    selftext?: string;
    permalink: string;
    preview?: string;
    url: string;
    score: number;
    ratio: number;
  };
  meta: {
    sentiment?: number;
    fullSentiment?: number;
    authorImg?: string;
  };
};

/**
 * Represents the root of a Reddit comment tree.
 */
export type ReplyRoot = {
  replies: Reply[];
};

/**
 * Represents a Reddit comment node and its replies.
 */
export type Comment = {
  data: {
    name: string;
    author: string;
    created: number;
    body: string;
    score: number;
  };
  meta: {
    replyPath: number[];
    sentiment?: number;
    authorImg?: string;
  };
  replies: Reply[];
};

/**
 * Represents the more replies button. Contains replyIds that can be used to fetch more children.
 */
export type More = {
  data: {
    count: number;
  };
  meta: {
    replyPath: number[];
  };
  replyIds: string[];
};

/**
 * Represents a child node in the comment tree.
 */
export type Reply = Comment | More;
