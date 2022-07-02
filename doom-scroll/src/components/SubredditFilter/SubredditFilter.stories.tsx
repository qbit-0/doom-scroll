import { Meta, Story } from "@storybook/react";
import React, { ComponentProps } from "react";

import SubredditFilter from "components/SubredditFilter/SubredditFilter";

export default {
    title: "Browse/SubredditFilter",
    component: SubredditFilter,
    parameters: {
        jest: ["SubredditFilter.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof SubredditFilter>> = (args) => (
    <SubredditFilter {...args} />
);

export const Default = Template.bind({});
Default.args = {};
