export type RedditArticle = [RedditListing, RedditT1[]];

export type RedditListing = {
    kind: string;
    before: string;
    after: string;
    data: {
        [key: string]: any;
        children: (RedditT3 | RedditT1)[];
    };
};

export type RedditT3 = {
    kind: string;
    data: {
        [key: string]: any;
    };
};

export type RedditT1 = {
    kind: string;
    data: {
        [key: string]: any;
    };
};

export type RedditMore = {
    kind: string;
    data: {
        [key: string]: any;
    };
};
