import { Post, PostDeque } from "./redditData";

export default class PostDequeUtils {
    static peekBot = (postDeque: PostDeque): Post | undefined => {
        return postDeque.data[postDeque.botId - 1];
    };

    static peekTop = (postDeque: PostDeque): Post | undefined => {
        return postDeque.data[postDeque.topId + 1];
    };

    static find = (postDeque: PostDeque, id: number) => {
        const post = postDeque.data[id];
        return post;
    };

    static pushBot = (postDeque: PostDeque, post: Post) => {
        post.id = postDeque.botId;
        postDeque.data[postDeque.botId] = post;

        if (postDeque.botId === postDeque.topId) {
            postDeque.botId++;
            postDeque.topId--;
        } else {
            postDeque.botId++;
        }

        postDeque.after = post.data.name;
    };

    static pushTop = (postDeque: PostDeque, post: Post) => {
        post.id = postDeque.topId;
        postDeque.data[postDeque.topId] = post;

        if (postDeque.botId === postDeque.topId) {
            postDeque.botId++;
            postDeque.topId--;
        } else {
            postDeque.topId--;
        }

        postDeque.before = post.data.name;
    };

    static popBot = (postDeque: PostDeque) => {
        delete postDeque.data[postDeque.botId - 1];
    };

    static popTop = (postDeque: PostDeque) => {
        delete postDeque.data[postDeque.topId + 1];
    };

    static clear = (postDeque: PostDeque) => {
        postDeque.data = {};
        postDeque.topId = 0;
        postDeque.botId = 0;
        postDeque.before = null;
        postDeque.after = null;
    };
}
