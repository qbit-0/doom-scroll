import { screen } from "@testing-library/react";
import CommentContainer from "containers/CommentContainer/CommentContainer";
import { CommentData } from "lib/reddit/redditData";
import { render } from "lib/utils/testUtils";
import React from "react";

describe("CommentComponent", () => {
    const comment: CommentData = {
        id: 1,
        kind: "comment",
        data: {
            author: "AuthorName",
            created: 0,
            score: 123,
            body_html: "<p>text here</p>",
        },
        meta: {
            sentiment: 1.5,
        },
        parentId: -1,
        childrenIds: [2, 3],
    };
    test("it should render author", () => {
        render(<CommentContainer comment={comment} />);
        expect(screen.getByText("AuthorName")).toBeInTheDocument();
    });
    test("it should render number of votes", () => {
        render(<CommentContainer comment={comment} />);
        expect(screen.getByText("123")).toBeInTheDocument();
    });
    test("it should render comment body", () => {
        render(<CommentContainer comment={comment} />);
        expect(screen.getByText("text here")).toBeInTheDocument();
    });
    test("it should render sentiment", () => {
        render(<CommentContainer comment={comment} />);
        expect(screen.getByText("1.5")).toBeInTheDocument();
    });
    test("it should render upvote ratio", () => {
        render(<CommentContainer comment={comment} />);
        expect(screen.getByText("123")).toBeInTheDocument();
    });
});
