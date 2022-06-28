export type PostDeque = {
    data: {
        [id: number]: PostData;
    };
    topId: number;
    botId: number;
    before: string | null;
    after: string | null;
};

export type PostData = {
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
    data: { [id: number]: ReplyData };
    currId: number;
};

export type CommentData = {
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

export type MoreData = {
    id: number;
    kind: string;
    data: {
        [key: string]: any;
    };
    meta: {};
    parentId: number;
};

export type ReplyData = CommentData | MoreData;
