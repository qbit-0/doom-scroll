import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { getElapsedString } from "lib/utils/getElapsedString";
import React from "react";

import * as stories from "components/Author/Author.stories";

const { Default } = composeStories(stories);

describe("Author", () => {
    test("should render the author's username", () => {
        render(<Default {...Default.args} />);

        expect(
            screen.getByText(Default?.args?.author as string)
        ).toBeInTheDocument();
    });
    test("should render the author's profile picture", () => {
        render(<Default {...Default.args} />);

        expect(
            screen.getByAltText(`${Default?.args?.author as string}'s profile`)
        ).toBeInTheDocument();
    });
    test("should render the relative age of posting", () => {
        render(<Default {...Default.args} />);

        const elapsedString = getElapsedString(
            Default?.args?.createdUtc as number
        );
        expect(
            screen.getByText(new RegExp(`${elapsedString}`))
        ).toBeInTheDocument();
    });
});
