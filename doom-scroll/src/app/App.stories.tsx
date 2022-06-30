import { Meta, Story } from "@storybook/react";
import App from "App/App";
import React, { ComponentProps } from "react";

export default {
    title: "App",
    component: App,
    parameters: {
        jest: ["Browse.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof App>> = (args) => <App {...args} />;
export const Default = Template.bind({});
Default.args = {};
