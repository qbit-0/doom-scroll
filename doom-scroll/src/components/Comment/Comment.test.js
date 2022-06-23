import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import Comment from "./Comment";

describe("Comment component", () => {
  const comment = {
    data: {
      author: "AuthorUsername",
      body: "Body Text",
      score: 456,
      created_utc: 0,
    },
    sentiment: 0.5,
  };

  test("it renders the author", () => {
    render(
      <Provider store={store}>
        <Comment comment={comment} />
      </Provider>
    );

    expect(screen.getByText(comment.data.author)).toBeInTheDocument();
  });

  test("it renders the body", () => {
    render(
      <Provider store={store}>
        <Comment comment={comment} />
      </Provider>
    );

    expect(screen.getByText(comment.data.body)).toBeInTheDocument();
  });

  test("it renders the score of the comment", () => {
    render(
      <Provider store={store}>
        <Comment comment={comment} />
      </Provider>
    );

    expect(screen.getByText(comment.data.score)).toBeInTheDocument();
  });

  test("it renders the sentiment of the comment", () => {
    render(
      <Provider store={store}>
        <Comment comment={comment} />
      </Provider>
    );

    expect(screen.getByText(comment.sentiment)).toBeInTheDocument();
  });

  test("it renders time elapsed since the comment was posted", () => {
    render(
      <Provider store={store}>
        <Comment comment={comment} />
      </Provider>
    );

    expect(screen.getByText(/(\d)+y/)).toBeInTheDocument();
  });
});
