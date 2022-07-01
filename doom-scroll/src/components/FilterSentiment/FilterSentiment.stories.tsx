import { Meta, Story } from "@storybook/react";
import React, { ComponentProps } from "react";

import FilterSentiment from "components/FilterSentiment/FilterSentiment";

export default {
    title: "Browse/FilterSentiment",
    component: FilterSentiment,
    parameters: {
        jest: ["FilterSentiment.test.tsx"],
    },
    decorators: [
        (Story) => (
            <div className="h-96 w-60 border-2">
                <Story />
            </div>
        ),
    ],
} as Meta;

const Template: Story<ComponentProps<typeof FilterSentiment>> = (args) => (
    <FilterSentiment {...args} />
);

export const Default = Template.bind({});
Default.args = {};
