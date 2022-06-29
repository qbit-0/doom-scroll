import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import * as stories from "components/Button/Button.stories";
import React from "react";

const { Primary } = composeStories(stories);

describe("Button", () => {
    test("should render the button text", () => {
        render(<Primary {...Primary.args} />);

        expect(
            screen.getByText(Primary.args?.children as string)
        ).toBeInTheDocument();
    });
});
