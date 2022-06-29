import { Meta, Story } from "@storybook/react";
import SentimentBanner from "components/SentimentBanner/SentimentBanner";
import React from "react";
import { ComponentProps } from "react";

export default {
    title: "SentimentBanner",
    component: SentimentBanner,
    parameters: {
        layout: "centered",
        jest: ["SentimentBanner.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof SentimentBanner>> = (args) => (
    <SentimentBanner {...args} />
);

export const Default = Template.bind({});
Default.args = {
    sentiment: 1.5,
    commentSentiment: 2,
    ratio: 0.95,
};
