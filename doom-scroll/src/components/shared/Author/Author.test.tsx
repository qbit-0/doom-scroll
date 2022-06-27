import { render, screen, waitFor } from "@testing-library/react";
import store from "app/store";
import Author from "components/shared/Author/Author";
import { updateAppToken } from "features/auth/authSlice";
import RedditApi from "lib/reddit/redditApi";
import React from "react";
import { Provider } from "react-redux";

describe("Author component", () => {
  const author = "AuthorUsername";
  const created = 0;

  beforeAll(() => {});

  test("it renders author name", () => {
    render(
      <Provider store={store}>
        <Author author={author} created={created} />
      </Provider>
    );

    expect(screen.getByText(author)).toBeInTheDocument();
  });

  test("it renders time elapsed", () => {
    render(
      <Provider store={store}>
        <Author author={author} created={created} />
      </Provider>
    );

    expect(screen.getByText(/(\d)+y/)).toBeInTheDocument();
  });

  test("it renders author profile picture", async () => {
    const getAppTokenSpy = jest.spyOn(RedditApi, "getAppToken");
    getAppTokenSpy.mockResolvedValue({
      access_token: "mock_access_token",
    });

    const fetchProfileImgSpy = jest.spyOn(RedditApi, "fetchProfileImg");
    fetchProfileImgSpy.mockResolvedValue("https://picsum.photos/200");

    store.dispatch(updateAppToken());

    render(
      <Provider store={store}>
        <Author author={author} created={created} />
      </Provider>
    );

    await waitFor(() => expect(getAppTokenSpy).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(fetchProfileImgSpy).toHaveBeenCalledTimes(1));

    const altText = `${author}'s profile picture.`;
    expect(await screen.findByAltText(altText)).toBeInTheDocument();
  });
});
