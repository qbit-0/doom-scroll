import { Meta, Story } from "@storybook/react";
import SlideNavBar from "components/SlideNavBar/SlideNavBar";
import React, { ComponentProps } from "react";

export default {
    title: "Shared/SlideNavBar",
    component: SlideNavBar,
    parameters: {
        jest: ["SlideNavBar.test.tsx"],
    },
    decorators: [
        (Story) => (
            <div className="h-[2000rem] pt-[150rem]">
                <Story />
            </div>
        ),
    ],
} as Meta;

const Template: Story<ComponentProps<typeof SlideNavBar>> = (args) => (
    <SlideNavBar {...args} />
);

export const Default = Template.bind({});
Default.args = {
    navBarPaths: {
        "/a/": "To A",
        "/b/": "To B",
        "/c/": "To C",
    },
    bottomMargin: 500,
};
