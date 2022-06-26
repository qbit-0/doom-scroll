import { Comment, More, Post, PostDeque, ReplyTree } from "./redditData";
import { postDequePushBot, replyTreePush } from "./redditDataUtils";

export const parsePostDeque = (redditListing: any): PostDeque => {
    const postDeque: PostDeque = {
        data: {},
        topId: 0,
        botId: 0,
        before: null,
        after: null,
    };
    parsePostListing(redditListing).forEach((post: Post) => {
        postDequePushBot(postDeque, post);
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
        meta: {},
    };

    if ("selftext" in redditPost.data)
        post.data.selftext = redditPost.data.selftext;

    if ("preview" in redditPost.data)
        post.data.preview = redditPost.data.preview.images[0].source.url;

    return post;
};

export const pushRepliesListing = (
    replyTree: ReplyTree,
    redditRepliesListing: any,
    parent: number
): number[] => {
    const listingChildren = redditRepliesListing.data.children;
    return listingChildren
        .map((redditReply: any) => pushReply(replyTree, redditReply, parent))
        .reduce((previousValue: number[], currentValue: number[]) => {
            return [...previousValue, currentValue];
        }, []);
};

export const pushReply = (
    replyTree: ReplyTree,
    redditReply: any,
    parent: number
): number => {
    switch (redditReply.kind) {
        case "t1": {
            return pushComment(replyTree, redditReply, parent);
        }
        case "more": {
            return pushMore(replyTree, redditReply, parent);
        }
        default: {
            throw new Error("invalid kind");
        }
    }
};

export const pushComment = (
    replyTree: ReplyTree,
    redditComment: any,
    parent: number
): number => {
    const commentId = replyTree.currId;
    const comment: Comment = {
        kind: "comment",
        data: {
            depth: redditComment.data.depth,
            name: redditComment.data.name,
            author: redditComment.data.author,
            created: redditComment.data.created_utc,
            body: redditComment.data.body,
            score: redditComment.data.score,
        },
        meta: {},
        parent: parent,
        children: [],
    };
    replyTreePush(replyTree, comment);

    let children: number[] = [];
    if (redditComment.data.replies !== "") {
        children = pushRepliesListing(
            replyTree,
            redditComment.data.replies,
            commentId
        );
    }
    comment.children = children;

    return commentId;
};

export const pushMore = (
    replyTree: ReplyTree,
    redditMore: any,
    parent: number
): number => {
    const moreId = replyTree.currId;
    const more: More = {
        kind: "more",
        data: {
            depth: redditMore.data.depth,
            count: redditMore.data.count,
            childrenIds: redditMore.data.childrenIds,
        },
        meta: {},
        parent: parent,
    };
    replyTreePush(replyTree, more);
    return moreId;
};

export const parseMoreListing = (
    replyTree: ReplyTree,
    redditMoreListing: any,
    parent: number
) => {
    redditMoreListing.data.children.things.forEach((reply: any) => {
        pushReply(replyTree, reply, parent);
    });
};
