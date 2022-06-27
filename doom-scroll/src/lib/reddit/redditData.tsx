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
    id?: number;
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
        selftextHTML?: string;
        preview?: string;
    };
    meta: {
        sentiment: number;
        fullSentiment?: number;
    };
};

export type ReplyTree = {
    data: { [id: number]: Reply };
    currId: number;
};

export type Comment = {
    id: number;
    kind: string;
    data: {
        name: string;
        depth: number;
        author: string;
        created: number;
        body: string;
        bodyHTML: string;
        score: number;
    };
    meta: {
        sentiment: number;
        fullSentiment?: number;
    };
    parentId: number;
    childrenIds: number[];
};

export type More = {
    id: number;
    kind: string;
    data: {
        name: string;
        depth: number;
        count: number;
        children: string[];
    };
    meta: {};
    parentId: number;
};

export type Reply = Comment | More;
