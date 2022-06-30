import { Meta, Story } from "@storybook/react";
import Reply from "components/Reply";
import React, { ComponentProps } from "react";

export default {
    title: "Reply",
    component: Reply,
    parameters: {
        jest: ["Post.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof Reply>> = (args) => (
    <Reply {...args} />
);

export const Comment = Template.bind({});
Comment.args = {
    reply: {
        id: 0,
        kind: "comment",
        data: {
            author: "Reddit",
            created_utc: 0,
            body_html: "<p>This is a comment.</p>",
            score: 100,
            depth: 0,
        },
        meta: {
            sentiment: 1.5,
        },
        parentId: -1,
        childrenIds: [],
    },
};

export const More = Template.bind({});
More.args = {
    reply: {
        id: 0,
        kind: "more",
        data: {
            count: 1,
            depth: 0,
        },
        meta: {},
        parentId: -1,
    },
};
