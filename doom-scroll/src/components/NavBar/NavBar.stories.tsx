import { Meta, Story } from "@storybook/react";
import NavBar from "components/NavBar/NavBar";
import React, { ComponentProps } from "react";
export default {
    title: "NavBar",
    component: NavBar,
    parameters: {
        layout: "centered",
        jest: ["NavBar.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof NavBar>> = (args) => (
    <NavBar {...args} />
);

export const Default = Template.bind({});
Default.args = {};
