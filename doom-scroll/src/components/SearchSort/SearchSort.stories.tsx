import { Meta, Story } from "@storybook/react";
import SearchSort from "components/SearchSort/SearchSort";
import React, { ComponentProps } from "react";

export default {
    title: "Browse/SearchSort",
    component: SearchSort,
    parameters: {
        jest: ["SearchSort.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof SearchSort>> = (args) => (
    <SearchSort {...args} />
);

export const Default = Template.bind({});
Default.args = {};
