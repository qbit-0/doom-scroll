import { Meta, Story } from "@storybook/react";
import React from "react";
import { ComponentProps } from "react";

import SanitizeHTML from "components/SanitizeHTML/SanitizeHTML";

export default {
    title: "Shared/SanitizeHTML",
    component: SanitizeHTML,
    parameters: {
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
