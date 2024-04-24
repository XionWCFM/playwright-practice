"use client";
import { RoutesQueryAndPath, createInternalPath } from "./router.util";
import { useInternalRouter } from "./use-internal-router";

type HomeRoutes = RoutesQueryAndPath<{ query: { type: "hello" | "world" } }>;

export const Routes = {
  home: {
    path: (arg?: HomeRoutes["arg"]) => createInternalPath("/", arg),
    useRouter: () => useInternalRouter<HomeRoutes>(),
  },
};
