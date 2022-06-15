import "@testing-library/jest-dom";
import { store } from "../../app/store";
import { loadPosts } from "./postsSlice";

test("loads posts correctly ", () => {
  store.dispatch(loadPosts());
});
