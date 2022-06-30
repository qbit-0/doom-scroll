import { Meta, Story } from "@storybook/react";
import SearchBar from "components/SearchBar/SearchBar";
import React, { ComponentProps } from "react";

export default {
    title: "Shared/SearchBar",
    component: SearchBar,
    parameters: {
        jest: ["SearchBar.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof SearchBar>> = (args) => (
    <SearchBar {...args} />
);

export const Default = Template.bind({});
Default.args = {};
