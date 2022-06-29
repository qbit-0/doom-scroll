import { Meta, Story } from "@storybook/react";
import VoteHorizontal from "components/VoteHorizontal";
import React from "react";
import { ComponentProps } from "react";

export default {
    title: "VoteHorizontal",
    component: VoteHorizontal,
    parameters: {
        layout: "centered",
        jest: ["VoteHorizontal.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof VoteHorizontal>> = (args) => (
    <VoteHorizontal {...args} />
);

export const Default = Template.bind({});
Default.args = {
    score: 100,
};
