import { Meta, Story } from "@storybook/react";
import MainNavBar from "components/MainNavBar";
import React, { ComponentProps } from "react";
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
