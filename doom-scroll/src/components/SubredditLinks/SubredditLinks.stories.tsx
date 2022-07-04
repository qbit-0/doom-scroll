import { Meta, Story } from "@storybook/react";
import React, { ComponentProps } from "react";

import SubredditLinks from "components/SubredditLinks/SubredditLinks";

export default {
    title: "Browse/SubredditLinks",
    component: SubredditLinks,
    parameters: {
        jest: ["SubredditLinks.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof SubredditLinks>> = (args) => (
    <SubredditLinks {...args} />
);

export const Default = Template.bind({});
Default.args = {};
