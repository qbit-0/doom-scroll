import { Meta, Story } from "@storybook/react";
import Hero from "pages/Hero/Hero";
import React, { ComponentProps } from "react";

export default {
    title: "Page/Hero",
    component: Hero,
    parameters: {
        jest: ["Hero.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof Hero>> = (args) => (
    <Hero {...args} />
);
export const Default = Template.bind({});
Default.args = {};
