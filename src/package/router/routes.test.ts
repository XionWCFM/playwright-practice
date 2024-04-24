import { Routes } from "./routes";

describe("Routes 테스트입니다.", () => {
  it("경로 매치 테스트", () => {
    expect(Routes.home.path()).toBe("/");
    expect(Routes.login.path()).toBe("/login");
    expect(Routes.post.path()).toBe("/post");
  });
});
