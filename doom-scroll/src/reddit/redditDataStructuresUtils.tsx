import { Reply, ReplyRoot } from "./redditDataStructures";

export const getReplyByPath = (
  reply: ReplyRoot,
  replyPath: number[]
): Reply => {
  return getReplyByPathInner(
    reply.replies[replyPath[0]],
    replyPath.slice(1, replyPath.length)
  );
};

const getReplyByPathInner = (reply: Reply, replyPath: number[]): Reply => {
  if (replyPath.length === 0) {
    return reply;
  }

  if ("replyIds" in reply) {
    return reply;
  }

  return getReplyByPathInner(
    reply.replies[replyPath[0]],
    replyPath.slice(1, replyPath.length)
  );
};
