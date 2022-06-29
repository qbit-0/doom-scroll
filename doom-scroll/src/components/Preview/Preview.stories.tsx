import { Meta, Story } from "@storybook/react";
import Preview from "components/Preview";
import React, { ComponentProps } from "react";

export default {
    title: "Preview",
    component: Preview,
    parameters: {
        layout: "centered",
        jest: ["Preview.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof Preview>> = (args) => (
    <Preview {...args} />
);

export const Default = Template.bind({});
Default.args = {
    src: "https://picsum.photos/400",
    href: "https://reddit.com",
};
