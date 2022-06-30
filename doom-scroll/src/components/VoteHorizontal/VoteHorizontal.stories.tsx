import { Meta, Story } from "@storybook/react";
import VoteHorizontal from "components/VoteHorizontal";
import React from "react";
import { ComponentProps } from "react";

export default {
    title: "Shared/VoteHorizontal",
    component: VoteHorizontal,
    parameters: {
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
