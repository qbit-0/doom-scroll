import { Meta, Story } from "@storybook/react";
import Option from "components/Option";
import Select from "components/Select";
import React, { ComponentProps } from "react";
export default {
    title: "Select",
    component: Select,
    parameters: {
        layout: "centered",
        jest: ["Select.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof Select>> = (args) => (
    <Select {...args} />
);

export const Default = Template.bind({});
Default.args = {
    title: "Select ABC",
    value: "A",
    children: [
        <Option value="A">Option A</Option>,
        <Option value="B">Option B</Option>,
        <Option value="C">Option C</Option>,
    ],
};
