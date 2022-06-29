import { Meta, Story } from "@storybook/react";
import SanitizeHTML from "components/SanitizeHTML";
import React from "react";
import { ComponentProps } from "react";

export default {
    title: "SanitizeHTML",
    component: SanitizeHTML,
    parameters: {
        layout: "centered",
        jest: ["SanitizeHTML.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof SanitizeHTML>> = (args) => (
    <SanitizeHTML {...args} />
);

export const Default = Template.bind({});
Default.args = {
    dirty: "</div><p><strong>Nisi id id aliquip do adipisicing irure do velit ullamco quis.</strong></p></div>",
};
