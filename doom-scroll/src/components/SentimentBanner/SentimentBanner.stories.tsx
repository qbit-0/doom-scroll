import { Meta, Story } from "@storybook/react";
import React from "react";
import { ComponentProps } from "react";

import SentimentBanner from "components/SentimentBanner/SentimentBanner";

export default {
    title: "Shared/SentimentBanner",
    component: SentimentBanner,
    parameters: {
        jest: ["SentimentBanner.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof SentimentBanner>> = (args) => (
    <SentimentBanner {...args} />
);

export const Default = Template.bind({});
Default.args = {
    sentiment: 1.5,
    ratio: 0.95,
};
