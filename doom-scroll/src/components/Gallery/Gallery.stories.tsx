import { Meta, Story } from "@storybook/react";
import React, { ComponentProps } from "react";

import Gallery from "components/Gallery/Gallery";

export default {
    title: "Browse/Gallery",
    component: Gallery,
    parameters: {
        jest: ["Gallery.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof Gallery>> = (args) => (
    <Gallery {...args} />
);

export const Default = Template.bind({});
Default.args = {
    srcs: [
        "https://picsum.photos/400",
        "https://picsum.photos/400/200",
        "https://picsum.photos/200/800",
    ],
};
