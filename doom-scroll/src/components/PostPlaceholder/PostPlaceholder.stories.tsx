import { Meta, Story } from "@storybook/react";
import PostPlaceholder from "components/PostPlaceholder/PostPlaceholder";
import React, { ComponentProps } from "react";

export default {
    title: "PostPlaceholder",
    component: PostPlaceholder,
    parameters: {
        layout: "centered",
        jest: ["PostPlaceholder.test.tsx"],
    },
    decorators: [
        (Story) => (
            <div className="w-7xl">
                <Story />
            </div>
        ),
    ],
} as Meta;

const Template: Story<ComponentProps<typeof PostPlaceholder>> = (args) => (
    <PostPlaceholder {...args} />
);
export const Default = Template.bind({});
Default.args = {};
