import { Meta, Story } from "@storybook/react";
import React, { ComponentProps } from "react";

import PostPlaceholder from "components/PostPlaceholder/PostPlaceholder";

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
