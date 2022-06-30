import { Meta, Story } from "@storybook/react";
import NavBar from "components/NavBar/NavBar";
import React, { ComponentProps } from "react";

export default {
    title: "Shared/NavBar",
    component: NavBar,
    parameters: {
        jest: ["NavBar.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof NavBar>> = (args) => (
    <NavBar {...args} />
);

export const Default = Template.bind({});
Default.args = {
    navBarPaths: {
        "/a/": "To A",
        "/b/": "To B",
        "/c/": "To C",
    },
};
