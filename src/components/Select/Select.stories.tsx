import { Meta, Story } from "@storybook/react";
import React, { ComponentProps } from "react";

import Option from "components/Option/Option";
import Select from "components/Select/Select";

export default {
    title: "Shared/Select",
    component: Select,
    parameters: {
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
