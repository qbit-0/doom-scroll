import { Meta, Story } from "@storybook/react";
import VoteVertical from "components/VoteVertical";
import React from "react";
import { ComponentProps } from "react";

export default {
    title: "VoteVertical",
    component: VoteVertical,
    parameters: {
        layout: "centered",
        jest: ["VoteVertical.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof VoteVertical>> = (args) => (
    <VoteVertical {...args} />
);

export const Default = Template.bind({});
Default.args = {
    score: 100,
};
