import { Meta, Story } from "@storybook/react";
import React, { ComponentProps } from "react";

import MainSearchBar from "components/MainSearchBar/MainSearchBar";

export default {
    title: "Shared/MainSearchBar",
    component: MainSearchBar,
    parameters: {
        jest: ["MainSearchBar.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof MainSearchBar>> = (args) => (
    <MainSearchBar {...args} />
);
export const Default = Template.bind({});
Default.args = {};
