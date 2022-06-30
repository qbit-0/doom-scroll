import { Meta, Story } from "@storybook/react";
import Article from "pages/Article/Article";
import React, { ComponentProps } from "react";

export default {
    title: "Page/Article",
    component: Article,
    parameters: {
        jest: ["Article.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof Article>> = (args) => (
    <Article {...args} />
);
export const Default = Template.bind({});
Default.args = {};
