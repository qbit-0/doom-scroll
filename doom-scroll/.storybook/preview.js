import { addDecorator } from "@storybook/react";
import { withTests } from "@storybook/addon-jest";
import "index.css";
import results from "../.jest-test-results.json";

addDecorator(
    withTests({
        results,
    })
);

// export const decorators = [
//     (Story) => (
//         <Provider store={store}>
//             <Story />
//         </Provider>
//     ),
// ];

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
