import { Meta, Story } from "@storybook/react";
import FilterSentiment from "components/FilterSentiment/FilterSentiment";
import React, { ComponentProps } from "react";

export default {
    title: "Browse/FilterSentiment",
    component: FilterSentiment,
    parameters: {
        jest: ["FilterSentiment.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof FilterSentiment>> = (args) => (
    <FilterSentiment {...args} />
);

export const Default = Template.bind({});
Default.args = {};
