"use client";
import { createRoutes } from "./router.util";

type HomeRoutes = { query: { type: "hello" | "world" } };
type LoginRoutes = { query: { from: "landing" | "referrer" } };
type PostRoutes = { pathname: [["slug", "react" | "typescript"]] };

export const Routes = {
  home: createRoutes<HomeRoutes>("/"),
  login: createRoutes<LoginRoutes>("/login"),
  post: createRoutes<PostRoutes>("/post"),
} as const;

const Example = () => {
  const router = Routes.post.useRouter();
  router.push(Routes.login.path());
};
