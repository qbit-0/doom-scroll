import { Story } from "@storybook/react";
import Author from "components/Author/Author";
import React from "react";
import { ComponentProps } from "react";

export default {
    title: "Author",
    component: Author,
};

const Template: Story<ComponentProps<typeof Author>> = (args) => (
    <Author {...args} />
);
export const Default = Template.bind({});
Default.args = {
    username: "AuthorUsername",
    profileImg: "https://picsum.photos/200",
    createdUtc: 0,
};
