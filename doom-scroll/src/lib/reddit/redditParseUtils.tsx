import { NlpUtils } from "../utils/nlpUtils";
import PostDequeUtils from "./postDequeUtils";
import { Comment, More, Post, PostDeque, ReplyTree } from "./redditData";
import ReplyTreeUtils from "./replyTreeUtils";

export const parsePostDeque = (redditListing: unknown): PostDeque => {
    const postDeque: PostDeque = {
        data: {},
        topId: 0,
        botId: 0,
        before: null,
        after: null,
    };
    parsePostListing(redditListing).forEach((post: Post) => {
        PostDequeUtils.pushBot(postDeque, post);
    });
    return postDeque;
};

export const parseArticle = (
    redditArticle: any
): {
    post: Post;
    replyTree: ReplyTree;
} => {
    const post = parsePost(redditArticle[0].data.children[0]);
    const replyTree: ReplyTree = {
        data: {},
        currId: 0,
    };
    pushRepliesListing(replyTree, redditArticle[1], -1);

    return {
        post: post,
        replyTree: replyTree,
    };
};

export const parsePostListing = (redditListing: any): Post[] => {
    if (redditListing.kind !== "Listing")
        throw new Error("not a Reddit Listing");

    const children = redditListing.data.children;
    return children.map(parsePost);
};

export const parsePost = (redditPost: any): Post => {
    const post: Post = {
        data: {
            name: redditPost.data.name,
            author: redditPost.data.author,
            created: redditPost.data.created_utc,
            subreddit: redditPost.data.subreddit,
            title: redditPost.data.title,
            permalink: redditPost.data.permalink,
            url: redditPost.data.url_overridden_by_dest,
            score: redditPost.data.ups,
            ratio: redditPost.data.upvote_ratio,
        },
        meta: {
            sentiment: 0,
        },
    };

    if ("selftext" in redditPost.data)
        post.data.selftext = redditPost.data.selftext;

    if ("selftext_html" in redditPost.data)
        post.data.selftextHTML = redditPost.data.selftext_html;

    if ("preview" in redditPost.data)
        post.data.preview = redditPost.data.preview.images[0].source.url;

    post.meta.sentiment = NlpUtils.analyzePost(post);

    return post;
};

export const pushRepliesListing = (
    replyTree: ReplyTree,
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
    replyTree: ReplyTree,
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
    replyTree: ReplyTree,
    redditComment: any,
    parentId: number
): number => {
    const commentId = replyTree.currId;
    const comment: Comment = {
        id: -1,
        kind: "comment",
        data: {
            name: redditComment.data.name,
            depth: redditComment.data.depth,
            author: redditComment.data.author,
            created: redditComment.data.created_utc,
            body: redditComment.data.body,
            bodyHTML: redditComment.data.body_html,
            score: redditComment.data.score,
        },
        meta: {
            sentiment: 0,
        },
        parentId: parentId,
        childrenIds: [],
    };

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
    replyTree: ReplyTree,
    redditMore: any,
    parentId: number
): number => {
    const moreId = replyTree.currId;
    const more: More = {
        id: -1,
        kind: "more",
        data: {
            name: redditMore.data.name,
            depth: redditMore.data.depth,
            count: redditMore.data.count,
            children: redditMore.data.children,
        },
        meta: {},
        parentId: parentId,
    };
    ReplyTreeUtils.push(replyTree, more, parentId);
    return moreId;
};

export const pushMoreListing = (
    replyTree: ReplyTree,
    redditMoreListing: any,
    more: More
) => {
    const moreReplies = redditMoreListing.json.data.things;

    const parentIds: {
        [depth: number]: number;
    } = {
        [more.data.depth]: more.parentId,
    };

    moreReplies.forEach((reply: any) => {
        const depth = reply.data.depth;
        const replyId = pushReply(replyTree, reply, parentIds[depth]);
        parentIds[depth + 1] = replyId;
    });
};
