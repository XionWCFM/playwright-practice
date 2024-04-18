import { waitFor } from "@testing-library/dom";
import { userStore } from "./store";
describe("store test", () => {
  it("can use on vanila environemnt ?", () => {
    const value = userStore.state;
    expect(value).toEqual({
      userName: "",
      userAge: "",
      userPhone: "",
    });
  });
  it("can use set state on vanila environemnt", async () => {
    const value = userStore.state;
    expect(value).toEqual({
      userName: "",
      userAge: "",
      userPhone: "",
    });
    userStore.setState((s) => ({ ...s, userName: "hello" }));
    waitFor(() => expect(value.userName).toBe("hello"));
  });
});
