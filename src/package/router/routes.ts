"use client";
import { RoutesQueryAndPath, createRoutes } from "./router.util";

type HomeRoutes = RoutesQueryAndPath<{ query: { type: "hello" | "world" } }>;
type LoginRoutes = RoutesQueryAndPath<{ query: { from: "landing" | "referrer" } }>;
type PostRoutes = RoutesQueryAndPath<{ pathname: [["slug", "react" | "typescript"]] }>;
export const Routes = {
  home: createRoutes<HomeRoutes>("/"),
  login: createRoutes<LoginRoutes>("/login"),
  post: createRoutes<PostRoutes>("/post"),
} as const;
