export type PostDeque = {
    data: {
        [id: number]: Post;
    };
    topId: number;
    botId: number;
    before: string | null;
    after: string | null;
};

export type Post = {
    data: {
        name: string;
        author: string;
        created: number;
        subreddit: string;
        title: string;
        permalink: string;
        url: string;
        score: number;
        ratio: number;

        selftext?: string;
        preview?: string;
    };
    meta: {
        sentiment?: number;
        fullSentiment?: number;
    };
};

export type ReplyTree = {
    data: { [id: number]: Reply };
    currId: number;
};

export type Comment = {
    data: {
        name: string;
        author: string;
        created: number;
        body: string;
        score: number;
    };
    meta: {
        sentiment?: number;
        fullSentiment?: number;
    };
    parent: number;
    children: number[];
};

export type More = {
    data: {
        count: number;
        childrenIds: string[];
    };
    meta: {};
    parent: number;
};

export type Reply = Comment | More;
