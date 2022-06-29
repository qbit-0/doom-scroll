import { Meta, Story } from "@storybook/react";
import SearchBar from "components/SearchBar";
import React, { ComponentProps } from "react";

export default {
    title: "SearchBar",
    component: SearchBar,
    parameters: {
        layout: "centered",
        jest: ["SearchBar.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof SearchBar>> = (args) => (
    <SearchBar {...args} />
);

export const Default = Template.bind({});
Default.args = {};
