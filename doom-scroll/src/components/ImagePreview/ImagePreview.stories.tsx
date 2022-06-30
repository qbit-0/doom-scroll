import { Meta, Story } from "@storybook/react";
import ImagePreview from "components/ImagePreview/ImagePreview";
import React, { ComponentProps } from "react";

export default {
    title: "Browse/ImagePreview",
    component: ImagePreview,
    parameters: {
        jest: ["ImagePreview.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof ImagePreview>> = (args) => (
    <ImagePreview {...args} />
);

export const Square = Template.bind({});
Square.args = {
    src: "https://picsum.photos/400",
    href: "https://picsum.photos/400",
};

export const Wide = Template.bind({});
Wide.args = {
    src: "https://picsum.photos/800/200",
    href: "https://picsum.photos/800/200",
};

export const Tall = Template.bind({});
Tall.args = {
    src: "https://picsum.photos/200/800",
    href: "https://picsum.photos/200/800",
};
