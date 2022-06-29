import { Meta, Story } from "@storybook/react";
import Comment from "components/Comment/Comment";
import React, { ComponentProps } from "react";
export default {
    title: "Comment",
    component: Comment,
    parameters: {
        layout: "centered",
        jest: ["Comment.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof Comment>> = (args) => (
    <Comment {...args} />
);

export const Default = Template.bind({});
Default.args = {
    comment: {
        id: 0,
        kind: "comment",
        data: {
            author: "Reddit",
            created_utc: 0,
            body_html: "<p>This is a comment.</p>",
            score: 100,
        },
        meta: {
            sentiment: 1.5,
        },
        parentId: -1,
        childrenIds: [],
    },
};

export const Deleted = Template.bind({});
Deleted.args = {
    comment: {
        id: 0,
        kind: "comment",
        data: {
            author: "[deleted]",
            created_utc: 0,
            body_html: "[deleted] by user",
            score: 100,
        },
        meta: {
            sentiment: 1.5,
        },
        parentId: -1,
        childrenIds: [],
    },
};
