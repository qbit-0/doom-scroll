import { Meta, Story } from "@storybook/react";
import NumComments from "components/NumComments/NumComments";
import React, { ComponentProps } from "react";

export default {
    title: "Shared/NumComments",
    component: NumComments,
    parameters: {
        jest: ["NumComments.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof NumComments>> = (args) => (
    <NumComments {...args} />
);

export const Default = Template.bind({});
Default.args = {
    num_comments: 123,
};
