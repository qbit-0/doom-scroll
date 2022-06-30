import { Story } from "@storybook/react";
import More from "components/More/More";
import React, { ComponentProps } from "react";

export default {
    title: "Article/More",
    component: More,
    parameters: {
        jest: ["More.test.tsx"],
    },
};

const Template: Story<ComponentProps<typeof More>> = (args) => (
    <More {...args} />
);

export const Default = Template.bind({});
Default.args = {
    more: {
        id: 0,
        kind: "more",
        data: {
            count: 1,
            depth: 0,
        },
        meta: {},
        parentId: -1,
    },
};
