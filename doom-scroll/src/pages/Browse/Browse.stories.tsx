import { Meta, Story } from "@storybook/react";
import Browse from "pages/Browse/Browse";
import React, { ComponentProps } from "react";

export default {
    title: "Page/Browse",
    component: Browse,
    parameters: {
        jest: ["Browse.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof Browse>> = (args) => (
    <Browse {...args} />
);
export const Default = Template.bind({});
Default.args = {};
