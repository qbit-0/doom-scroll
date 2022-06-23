import "@testing-library/jest-dom";
import { act, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import App from "./App";

describe("App component", () => {
  test("it renders the hero page", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const paragraph =
      "Doomscrolling and doomsurfing are new terms referring to the tendency to continue to surf or scroll through bad news, even though that news is saddening, disheartening, or depressing.";

    expect(screen.getByText(paragraph)).toBeInTheDocument();
  });

  test("it renders the navigation bar", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText("r/popular")).toBeInTheDocument();
    expect(screen.getByText("r/all")).toBeInTheDocument();
  });
});
