import { Meta, Story } from "@storybook/react";
import React, { ComponentProps } from "react";

import InputNumber from "components/InputNumber/InputNumber";

export default {
    title: "Shared/InputNumber",
    component: InputNumber,
    parameters: {
        jest: ["InputNumber.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof InputNumber>> = (args) => (
    <InputNumber {...args} />
);

export const Default = Template.bind({});
Default.args = {};
