import { Meta, Story } from "@storybook/react";
import React, { ComponentProps } from "react";

import SearchFilter from "components/SearchFilter/SearchFilter";

export default {
    title: "Browse/SearchFilter",
    component: SearchFilter,
    parameters: {
        jest: ["SearchFilter.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof SearchFilter>> = (args) => (
    <SearchFilter {...args} />
);

export const Default = Template.bind({});
Default.args = {};
