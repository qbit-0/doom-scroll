import { Post, PostDeque, Reply, ReplyTree } from "./redditData";

export const postDequeFind = (postDeque: PostDeque, id: number) => {
    const post = postDeque.data[id];
    if (post === undefined) throw new Error("post not found");

    return post;
};

export const postDequePushBot = (postDeque: PostDeque, post: Post) => {
    postDeque.data[postDeque.botId] = post;
    postDeque.botId++;
    postDeque.after = post.data.name;
};

export const postDequePushTop = (postDeque: PostDeque, post: Post) => {
    postDeque.data[postDeque.topId] = post;
    postDeque.topId--;
    postDeque.before = post.data.name;
};

export const postDequePopBot = (postDeque: PostDeque) => {
    if (postDeque.data[postDeque.botId - 1] === undefined)
        throw new Error("post not found");

    delete postDeque.data[postDeque.botId - 1];
};

export const postDequePopTop = (postDeque: PostDeque) => {
    if (postDeque.data[postDeque.topId + 1] === undefined)
        throw new Error("post not found");

    delete postDeque.data[postDeque.topId + 1];
};

export const replyTreeFind = (replyTree: ReplyTree, id: number): Reply => {
    const reply = replyTree.data[id];
    if (reply === undefined) {
        throw new Error(`reply with id ${id} not found`);
    }
    return reply;
};

export const replyTreePush = (replyTree: ReplyTree, reply: Reply) => {
    replyTree.data[replyTree.currId] = reply;
    replyTree.currId++;
};

export const replyTreeRemove = (replyTree: ReplyTree, id: number) => {
    if (replyTree.data[id] === undefined)
        throw new Error(`reply with id ${id} not found`);

    delete replyTree.data[id];
};
