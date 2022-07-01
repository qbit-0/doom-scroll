import { Meta, Story } from "@storybook/react";
import React, { ComponentProps } from "react";

import AuthorContainer from "components/AuthorContainer/AuthorContainer";

export default {
    title: "Shared/AuthorContainer",
    component: AuthorContainer,
    parameters: {
        jest: ["AuthorContainer.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof AuthorContainer>> = (args) => (
    <AuthorContainer {...args} />
);
export const Default = Template.bind({});
Default.args = {
    author: "Reddit",
    created_utc: 0,
};

export const Deleted = Template.bind({});
Deleted.args = {
    author: "[deleted]",
    created_utc: 0,
};
