import { Meta, Story } from "@storybook/react";
import Preview from "components/Preview/Preview";
import React, { ComponentProps } from "react";

export default {
    title: "Browse/Preview",
    component: Preview,
    parameters: {
        jest: ["Preview.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof Preview>> = (args) => (
    <Preview {...args} />
);

export const Square = Template.bind({});
Square.args = {
    src: "https://picsum.photos/400",
    href: "https://reddit.com",
};

export const Wide = Template.bind({});
Wide.args = {
    src: "https://picsum.photos/800/200",
    href: "https://reddit.com",
};

export const Tall = Template.bind({});
Tall.args = {
    src: "https://picsum.photos/200/800",
    href: "https://reddit.com",
};
