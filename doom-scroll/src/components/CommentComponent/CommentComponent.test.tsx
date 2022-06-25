import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import model from "wink-eng-lite-web-model";
import winkNLP from "wink-nlp";
import store from "../../app/store";
import { Comment, Reply } from "../../reddit/redditDataStructures";
import CommentComponent from "./CommentComponent";

describe("Comment component", () => {
  const nlp = winkNLP(model, ["sbd", "negation", "sentiment"]);

  const name = "adsf";
  const author = "AuthorUsername";
  const created = 0;
  const body = "Body Text";
  const score = 456;
  const replyPath = [3, 2, 1];
  const sentiment = 0.4;
  const replies: Reply[] = [];

  const comment: Comment = {
    data: {
      name: name,
      author: author,
      created: created,
      body: body,
      score: score,
    },
    meta: {
      replyPath: replyPath,
      sentiment: sentiment,
    },
    replies: replies,
  };

  test("it renders the author", () => {
    render(
      <Provider store={store}>
        <CommentComponent comment={comment} nlp={nlp} />
      </Provider>
    );

    expect(screen.getByText(author)).toBeInTheDocument();
  });

  test("it renders the body", () => {
    render(
      <Provider store={store}>
        <CommentComponent comment={comment} nlp={nlp} />
      </Provider>
    );

    expect(screen.getByText(body)).toBeInTheDocument();
  });

  test("it renders the score of the comment", () => {
    render(
      <Provider store={store}>
        <CommentComponent comment={comment} nlp={nlp} />
      </Provider>
    );

    expect(screen.getByText(score)).toBeInTheDocument();
  });

  test("it renders the sentiment of the comment", () => {
    render(
      <Provider store={store}>
        <CommentComponent comment={comment} nlp={nlp} />
      </Provider>
    );

    expect(screen.getByText(sentiment)).toBeInTheDocument();
  });

  test("it renders time elapsed since the comment was posted", () => {
    render(
      <Provider store={store}>
        <CommentComponent comment={comment} nlp={nlp} />
      </Provider>
    );

    expect(screen.getByText(/(\d)+y/)).toBeInTheDocument();
  });
});
