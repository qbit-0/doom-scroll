import { Meta, Story } from "@storybook/react";
import Option from "components/Option/Option";
import React, { ComponentProps } from "react";
export default {
    title: "Option",
    component: Option,
    parameters: {
        layout: "centered",
        jest: ["Option.test.tsx"],
    },
    decorators: [
        (Story) => (
            <select>
                <Story />
            </select>
        ),
    ],
} as Meta;

const Template: Story<ComponentProps<typeof Option>> = (args) => (
    <Option {...args} />
);

export const Default = Template.bind({});
Default.args = {
    value: "A",
    children: "Option A",
};
