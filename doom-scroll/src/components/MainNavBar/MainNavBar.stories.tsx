import { Meta, Story } from "@storybook/react";
import React, { ComponentProps } from "react";

import MainNavBar from "components/MainNavBar/MainNavBar";

export default {
    title: "Shared/MainNavBar",
    component: MainNavBar,
    parameters: {
        jest: ["MainNavBar.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof MainNavBar>> = (args) => (
    <MainNavBar {...args} />
);

export const Default = Template.bind({});
Default.args = {};
