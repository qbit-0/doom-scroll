import { screen } from "@testing-library/react";
import CommentAndReplies from "components/CommentAndReplies/CommentAndReplies";
import { CommentData, MoreData } from "lib/reddit/redditData";
import { render } from "lib/utils/testUtils";
import React from "react";

describe("CommentAndReplies component", () => {
    const parentComment: CommentData = {
        id: 0,
        kind: "comment",
        data: {
            author: "AuthorA",
            created: 0,
            score: 123,
            body_html: "<p>parent comment text</p>",
        },
        meta: {
            sentiment: 1.5,
        },
        parentId: -1,
        childrenIds: [1, 2],
    };

    const childComment: CommentData = {
        id: 1,
        kind: "comment",
        data: {
            author: "AuthorB",
            created: 0,
            score: 321,
            body_html: "<p>child comment text</p>",
        },
        meta: {
            sentiment: 0.5,
        },
        parentId: 1,
        childrenIds: [],
    };

    const childMore: MoreData = {
        id: 2,
        kind: "more",
        data: {},
        meta: {},
        parentId: 1,
    };

    test("it should render the parent comment", () => {
        const preloadedState = {
            comments: {
                pathname: null,
                searchStr: null,
                replyTree: {
                    data: {
                        0: parentComment,
                        1: childComment,
                        2: childMore,
                    },
                    currId: 3,
                },
                isRefreshing: false,
                isLoadingMore: false,
            },
        };

        render(<CommentAndReplies comment={parentComment} />, {
            preloadedState: preloadedState,
        });
        expect(screen.getByText("AuthorA")).toBeInTheDocument();
        expect(screen.getByText("123")).toBeInTheDocument();
        expect(screen.getByText("1.5")).toBeInTheDocument();
        expect(screen.getByText("parent comment text")).toBeInTheDocument();
    });

    test("it should render the child comment", () => {});

    test("it should render the child more", () => {});
});
