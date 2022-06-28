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
        [key: string]: any;
    };
    meta: {
        sentiment: number;
        commentsSentiment?: number;
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
        [key: string]: any;
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
        [key: string]: any;
    };
    meta: {};
    parentId: number;
};

export type Reply = Comment | More;
