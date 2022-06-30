import { Meta, Story } from "@storybook/react";
import Option from "components/Option";
import React, { ComponentProps } from "react";
export default {
    title: "Shared/Option",
    component: Option,
    parameters: {
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
