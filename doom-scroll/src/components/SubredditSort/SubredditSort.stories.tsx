import { Meta, Story } from "@storybook/react";
import React, { ComponentProps } from "react";

import SubredditSort from "components/SubredditSort/SubredditSort";

export default {
    title: "Browse/SubredditSort",
    component: SubredditSort,
    parameters: {
        jest: ["SubredditSort.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof SubredditSort>> = (args) => (
    <SubredditSort {...args} />
);

export const Default = Template.bind({});
Default.args = {};
