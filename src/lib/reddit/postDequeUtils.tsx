import { PostData, PostDequeData } from "./redditData";

class PostDequeUtils {
    static peekBot = (postDeque: PostDequeData): PostData | undefined => {
        return postDeque.data[postDeque.botId - 1];
    };

    static peekTop = (postDeque: PostDequeData): PostData | undefined => {
        return postDeque.data[postDeque.topId + 1];
    };

    static find = (postDeque: PostDequeData, id: number) => {
        const post = postDeque.data[id];
        return post;
    };

    static pushBot = (postDeque: PostDequeData, post: PostData) => {
        post.id = postDeque.botId;
        postDeque.data[postDeque.botId] = post;
        if (postDeque.botId === postDeque.topId) {
            postDeque.botId++;
            postDeque.topId--;
        } else {
            postDeque.botId++;
        }
        postDeque.after = post.data["name"];
    };

    static pushTop = (postDeque: PostDequeData, post: PostData) => {
        post.id = postDeque.topId;
        postDeque.data[postDeque.topId] = post;

        if (postDeque.botId === postDeque.topId) {
            postDeque.botId++;
            postDeque.topId--;
        } else {
            postDeque.topId--;
        }

        postDeque.before = post.data["name"];
    };

    static popBot = (postDeque: PostDequeData) => {
        delete postDeque.data[postDeque.botId - 1];
    };

    static popTop = (postDeque: PostDequeData) => {
        delete postDeque.data[postDeque.topId + 1];
    };

    static clear = (postDeque: PostDequeData) => {
        postDeque.data = {};
        postDeque.topId = 0;
        postDeque.botId = 0;
        postDeque.before = null;
        postDeque.after = null;
    };
}

export default PostDequeUtils;
