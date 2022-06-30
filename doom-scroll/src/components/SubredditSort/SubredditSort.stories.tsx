import { Meta, Story } from "@storybook/react";
import SubredditSort from "components/SubredditSort";
import React, { ComponentProps } from "react";

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
