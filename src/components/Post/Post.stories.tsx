import { Meta, Story } from "@storybook/react";
import React, { ComponentProps } from "react";

import Post from "components/Post/Post";

export default {
    title: "Browse/Post",
    component: Post,
    parameters: {
        jest: ["Post.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof Post>> = (args) => (
    <Post {...args} />
);

export const Text = Template.bind({});
Text.args = {
    post: {
        data: {
            author: "reddit",
            created_utc: 0,
            subreddit: "pics",
            title: "Amet Lorem quis et tempor laboris ea.",
            permalink: "http://reddit.com",
            score: 100,
            selftext_html:
                "<p><strong>Lorem ipsum dolor sit amet, consectet</strong></p>",
            upvote_ratio: 0.95,
        },
        meta: {
            sentiment: 0.5,
            commentsSentiment: 1,
        },
    },
};

export const Picture = Template.bind({});
Picture.args = {
    post: {
        data: {
            author: "reddit",
            created_utc: 0,
            subreddit: "pics",
            title: "Amet Lorem quis et tempor laboris ea.",
            permalink: "http://reddit.com",
            score: 100,
            preview: {
                images: {
                    0: {
                        source: {
                            url: "https://picsum.photos/400",
                        },
                    },
                },
            },
            upvote_ratio: 0.95,
        },
        meta: {
            sentiment: 0.5,
            commentsSentiment: 1,
        },
    },
};
