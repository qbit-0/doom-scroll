import { Meta, Story } from "@storybook/react";
import MainNavBar from "components/MainNavBar";
import React, { ComponentProps } from "react";
export default {
    title: "MainNavBar",
    component: MainNavBar,
    parameters: {
        layout: "centered",
        jest: ["MainNavBar.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof MainNavBar>> = (args) => (
    <MainNavBar {...args} />
);

export const Default = Template.bind({});
Default.args = {};
