import { NlpUtils } from "../utils/nlpUtils";
import PostDequeUtils from "./postDequeUtils";
import {
    CommentData,
    MoreData,
    PostData,
    PostDequeData,
    ReplyTreeData,
} from "./redditData";
import ReplyTreeUtils from "./replyTreeUtils";

export const parsePostDeque = (redditListing: any): PostDequeData => {
    const postDeque: PostDequeData = {
        data: {},
        topId: 0,
        botId: 0,
        before: null,
        after: null,
    };
    parsePostListing(redditListing).forEach((post: PostData) => {
        PostDequeUtils.pushBot(postDeque, post);
    });
    return postDeque;
};

export const parseArticle = (
    redditArticle: any
): {
    post: PostData;
    replyTree: ReplyTreeData;
} => {
    const post = parsePost(redditArticle[0].data.children[0]);
    const replyTree: ReplyTreeData = {
        data: {},
        currId: 0,
    };
    pushRepliesListing(replyTree, redditArticle[1], -1);

    return {
        post: post,
        replyTree: replyTree,
    };
};

export const parsePostListing = (redditListing: any): PostData[] => {
    if (redditListing.kind !== "Listing")
        throw new Error("not a Reddit Listing");

    const children = redditListing.data.children;
    return children.map(parsePost);
};

export const parsePost = (redditPost: any): PostData => {
    const post: PostData = {
        data: structuredClone(redditPost.data),
        meta: {
            sentiment: 0,
        },
    };

    post.meta.sentiment = NlpUtils.analyzePost(post);

    return post;
};

export const pushRepliesListing = (
    replyTree: ReplyTreeData,
    redditRepliesListing: any,
    parentId: number
): number[] => {
    const listingChildren = redditRepliesListing.data.children;
    return listingChildren
        .map((redditReply: any) => pushReply(replyTree, redditReply, parentId))
        .reduce((previousValue: number[], currentValue: number[]) => {
            return [...previousValue, currentValue];
        }, []);
};

export const pushReply = (
    replyTree: ReplyTreeData,
    redditReply: any,
    parentId: number
): number => {
    switch (redditReply.kind) {
        case "t1": {
            return pushComment(replyTree, redditReply, parentId);
        }
        case "more": {
            return pushMore(replyTree, redditReply, parentId);
        }
        default: {
            throw new Error("invalid kind");
        }
    }
};

export const pushComment = (
    replyTree: ReplyTreeData,
    redditComment: any,
    parentId: number
): number => {
    const commentId = replyTree.currId;

    const copiedEntries = Object.entries(redditComment.data)
        .filter((entry: [string, any]) => entry[0] !== "replies")
        .map((entry: [string, any]) => [entry[0], structuredClone(entry[1])]);

    const comment: CommentData = {
        id: -1,
        kind: "comment",
        data: Object.fromEntries(copiedEntries),
        meta: {
            sentiment: 0,
        },
        parentId: parentId,
        childrenIds: [],
    };
    delete comment.data["replies"];

    comment.meta.sentiment = NlpUtils.analyzeComment(comment);

    ReplyTreeUtils.push(replyTree, comment, parentId);

    let children: number[] = [];
    if (redditComment.data.replies !== "") {
        children = pushRepliesListing(
            replyTree,
            redditComment.data.replies,
            commentId
        );
    }
    comment.childrenIds = children;
    return commentId;
};

export const pushMore = (
    replyTree: ReplyTreeData,
    redditMore: any,
    parentId: number
): number => {
    const moreId = replyTree.currId;
    const more: MoreData = {
        id: -1,
        kind: "more",
        data: structuredClone(redditMore.data),
        meta: {},
        parentId: parentId,
    };
    ReplyTreeUtils.push(replyTree, more, parentId);
    return moreId;
};

export const pushMoreListing = (
    replyTree: ReplyTreeData,
    redditMoreListing: any,
    more: MoreData
) => {
    const moreReplies = redditMoreListing.json.data.things;

    const parentIds: {
        [depth: number]: number;
    } = {
        [more.data["depth"]]: more.parentId,
    };

    moreReplies.forEach((reply: any) => {
        const depth = reply.data.depth;
        const replyId = pushReply(replyTree, reply, parentIds[depth]);
        parentIds[depth + 1] = replyId;
    });
};
