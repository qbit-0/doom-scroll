import { Meta, Story } from "@storybook/react";
import Author from "components/Author/Author";
import React, { ComponentProps } from "react";

export default {
    title: "Author",
    component: Author,
    parameters: {
        layout: "centered",
        jest: ["Author.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof Author>> = (args) => (
    <Author {...args} />
);
export const Default = Template.bind({});
Default.args = {
    username: "AuthorUsername",
    profileImg: "https://picsum.photos/200",
    createdUtc: 0,
};
