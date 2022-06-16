import "@testing-library/jest-dom";
import { store } from "../../app/store";
import { acquireAppToken } from "./authSlice";

test("acquires a token for app only OAuth", () => {
  store.dispatch(acquireAppToken());
});
