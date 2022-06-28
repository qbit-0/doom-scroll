import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import Author from "components/Author/Author";
import { getElapsedString } from "lib/utils/getElapsedString";
import React from "react";
import * as stories from "components/Author/Author.stories";

const { Default } = composeStories(stories);

describe("Author", () => {
    test("it should render the author's username", () => {
        render(<Default />);

        expect(screen.getByText(Default.args.username)).toBeInTheDocument();
    });
    test("it should render the author's profile picture", () => {
        render(<Default />);

        expect(
            screen.getByAltText(`${Default.args.username}'s profile`)
        ).toBeInTheDocument();
    });
    test("it should render the relative age of posting", () => {
        render(<Default />);

        const elapsedString = getElapsedString(Default.args.createdUtc);
        expect(
            screen.getByText(new RegExp(`${elapsedString}`))
        ).toBeInTheDocument();
    });
});
