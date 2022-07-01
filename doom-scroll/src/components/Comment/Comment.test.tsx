import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import React from "react";

import * as stories from "components/Comment/Comment.stories";

const { Default } = composeStories(stories);

describe("Comment", () => {
    test("should render the author's username", () => {
        render(<Default {...Default.args} />);

        expect(
            screen.getByText(Default.args?.comment?.data["author"] as string)
        ).toBeInTheDocument();
    });

    test("should render the body text", () => {
        render(<Default {...Default.args} />);

        expect(
            screen.getByText(Default.args?.comment?.data["body_html"] as string)
        ).toBeInTheDocument();
    });
});
