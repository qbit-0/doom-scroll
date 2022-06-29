import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import * as stories from "components/Comment/Comment.stories";
import React from "react";

const { Default } = composeStories(stories);

describe("Comment", () => {
    test("should render the author's username", () => {
        render(<Default {...Default.args} />);

        expect(
            screen.getByText(Default.args?.author as string)
        ).toBeInTheDocument();
    });

    test("should render the body text", () => {
        render(<Default {...Default.args} />);

        expect(
            screen.getByText(Default.args?.bodyHtml as string)
        ).toBeInTheDocument();
    });
});
