import {
    combineReducers,
    configureStore,
    PreloadedState,
} from "@reduxjs/toolkit";
import { Meta, Story } from "@storybook/react";
import Comment from "components/Comment/Comment";
import authReducer from "features/auth/authSlice";
import commentsReducer from "features/comments/commentsSlice";
import nlpReducer from "features/nlp/nlpSlice";
import postsReducer from "features/posts/postsSlice";
import React, { ComponentProps } from "react";
import { BrowserRouter } from "react-router-dom";
export default {
    title: "Comment",
    component: Comment,
    parameters: {
        layout: "centered",
        jest: ["Comment.test.tsx"],
    },
} as Meta;

const Template: Story<ComponentProps<typeof Comment>> = (args) => (
    <Comment {...args} />
);

export const Default = Template.bind({});
Default.args = {
    comment: {
        id: 0,
        kind: "comment",
        data: {
            author: "Author",
            created_utc: 0,
            body_html: "<p>This is a comment.</p>",
            score: 100,
        },
        meta: {
            sentiment: 1.5,
        },
        parentId: -1,
        childrenIds: [],
    },
};

const rootReducer = combineReducers({
    auth: authReducer,
    // posts: postsReducer,
    // comments: commentsReducer,
    nlp: nlpReducer,
});

// type RootState = ReturnType<typeof rootReducer>;

// const setupStore = (preloadedState?: PreloadedState<RootState>) => {
//     const store = configureStore({
//         reducer: rootReducer,
//         preloadedState: preloadedState,
//     });
//     return store;
// };

Default.decorators = [
    (Story) => {
        // const newStore = setupStore();
        return (
            <BrowserRouter>
                <Story />
            </BrowserRouter>
        );
    },
];
