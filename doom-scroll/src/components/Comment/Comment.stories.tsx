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
Default.args = {};
