import { Meta, Story } from "@storybook/react";
import Button, { ButtonStyle } from "components/Button/Button";
import React from "react";
import { ComponentProps } from "react";

export default {
    title: "Button",
    component: Button,
    parameters: {
        layout: "centered",
        jest: ["Button.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof Button>> = (args) => (
    <Button {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    buttonStyle: ButtonStyle.PRIMARY,
    children: "Button Text",
};

export const Secondary = Template.bind({});
Secondary.args = {
    buttonStyle: ButtonStyle.SECONDARY,
    children: "Button Text",
};

export const RedBorder = Template.bind({});
RedBorder.args = {
    buttonStyle: ButtonStyle.PRIMARY,
    borderColor: "border-red-600",
    children: "Button Text",
};

export const RedBackground = Template.bind({});
RedBackground.args = {
    buttonStyle: ButtonStyle.PRIMARY,
    bgColor: "bg-red-600",
    children: "Button Text",
};
