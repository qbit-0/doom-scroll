import { Meta, Story } from "@storybook/react";
import React, { ComponentProps } from "react";

import Author from "components/Author/Author";

export default {
    title: "Shared/Author",
    component: Author,
    parameters: {
        jest: ["Author.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof Author>> = (args) => (
    <Author {...args} />
);
export const Default = Template.bind({});
Default.args = {
    author: "AuthorUsername",
    profileImg: "https://picsum.photos/200",
    createdUtc: 0,
};

export const Deleted = Template.bind({});
Deleted.args = {
    author: "[deleted]",
    profileImg: null,
    createdUtc: 0,
};
