import { Meta, Story } from "@storybook/react";
import VoteVertical from "components/VoteVertical/VoteVertical";
import React from "react";
import { ComponentProps } from "react";

export default {
    title: "Shared/VoteVertical",
    component: VoteVertical,
    parameters: {
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
