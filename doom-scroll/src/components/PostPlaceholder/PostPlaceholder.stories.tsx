import { Meta, Story } from "@storybook/react";
import PostPlaceholder from "components/PostPlaceholder";
import React, { ComponentProps } from "react";

export default {
    title: "Browse/PostPlaceholder",
    component: PostPlaceholder,
    parameters: {
        jest: ["PostPlaceholder.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof PostPlaceholder>> = (args) => (
    <PostPlaceholder {...args} />
);
export const Default = Template.bind({});
Default.args = {};
