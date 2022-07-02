import { Story } from "@storybook/react";
import { setupStore } from "App/store";
import { CommentData, MoreData } from "lib/reddit/redditData";
import React, { ComponentProps } from "react";
import { Provider } from "react-redux";

import ReplyTree from "components/ReplyTree/ReplyTree";

export default {
    title: "Article/ReplyTree",
    component: ReplyTree,
    parameters: {
        jest: ["ReplyTree.test.tsx"],
    },
};

const Template: Story<ComponentProps<typeof ReplyTree>> = (args) => (
    <ReplyTree {...args} />
);

export const Default = Template.bind({});

const parentComment: CommentData = {
    id: 0,
    kind: "comment",
    data: {
        author: "AuthorA",
        created_utc: 0,
        score: 123,
        body_html: "<p>parent comment text</p>",
        depth: 0,
    },
    meta: {
        sentiment: 1.5,
    },
    parentId: -1,
    childrenIds: [1],
};

const childComment: CommentData = {
    id: 1,
    kind: "comment",
    data: {
        author: "AuthorB",
        created_utc: 0,
        score: 321,
        body_html: "<p>child comment text</p>",
        depth: 1,
    },
    meta: {
        sentiment: 0.5,
    },
    parentId: 1,
    childrenIds: [2],
};

const childMore: MoreData = {
    id: 2,
    kind: "more",
    data: {
        count: 1,
        depth: 2,
    },
    meta: {},
    parentId: 1,
};

const preloadedState = {
    article: {
        pathname: null,
        searchStr: null,
        post: null,
        replyTree: {
            data: {
                0: parentComment,
                1: childComment,
                2: childMore,
            },
            currId: 3,
        },
        isRefreshing: false,
        isLoadingMore: false,
    },
};

const store = setupStore(preloadedState);

Default.args = {};

Default.decorators = [
    (Story) => {
        return (
            <Provider store={store}>
                <Story />
            </Provider>
        );
    },
];
