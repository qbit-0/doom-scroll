import { Meta, Story } from "@storybook/react";
import Comment from "components/Comment/Comment";
import React, { ComponentProps } from "react";

export default {
    title: "Comment",
    component: Comment,
    parameters: {
        jest: ["Comment.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof Comment>> = (args) => (
    <Comment {...args} />
);

export const Default = Template.bind({});
Default.args = {
    author: "",
    createdUtc: 0,
    bodyHtml: "Body Text",
    score: 100,
    sentiment: 1.5,
};