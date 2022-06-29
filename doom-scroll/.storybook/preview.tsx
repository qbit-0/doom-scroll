import { addDecorator } from "@storybook/react";
import { withTests } from "@storybook/addon-jest";
import "index.css";
import results from "../.jest-test-results.json";
import { setupStore } from "../src/App/store";
import { Provider } from "react-redux";

addDecorator(
    withTests({
        results,
    })
);

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
