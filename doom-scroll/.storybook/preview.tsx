import { addDecorator } from "@storybook/react";
import { withTests } from "@storybook/addon-jest";
import "index.css";
import results from "../.jest-test-results.json";
import { setupStore } from "../src/App/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

addDecorator(
    withTests({
        results,
    })
);

export const decorators = [
    (Story) => {
        const newStore = setupStore();
        return (
            <Provider store={newStore}>
                <Router>
                    <Story />
                </Router>
            </Provider>
        );
    },
];

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
