import * as qs from "qs";

type DefaultQuery = Record<string, any>;
type DefaultPathname = Array<[string, any]>;
type DefaultRouterType = {
  query?: DefaultQuery;
  pathname?: DefaultPathname;
  catchAll?: string;
};
type TupleArrayToRecord<T extends Array<[string, any]>> = {
  [K in T[number][0]]: Extract<T[number], [K, any]>[1];
};
type ExtractPathnameValue<T extends DefaultPathname> = {
  [K in keyof T]: T[K] extends [any, infer V] ? V : never;
};

export type RoutesQueryAndPath<T extends DefaultRouterType = DefaultRouterType> = {
  query: T["query"] extends DefaultQuery ? Partial<T["query"]> : DefaultQuery;
  pathname: T["pathname"] extends DefaultPathname ? TupleArrayToRecord<T["pathname"]> : Record<string, any>;
  pathnameValue: T["pathname"] extends DefaultPathname ? ExtractPathnameValue<T["pathname"]> : string[];
  pathnameTuple: T["pathname"] extends DefaultPathname ? T["pathname"] : DefaultPathname;
  pathnameCatchAll: T["catchAll"] extends string ? Record<T["catchAll"], string[]> : Record<string, string[]>;
};

export const parseSearchParams = <T extends Record<string, unknown>>(param?: string): T => {
  return qs.parse(param ? param.replace(/^\?/, "") : "") as T;
};

export const stringfySearchParams = (obj?: Record<string, unknown>): string => {
  return qs.stringify(obj ?? {}, { arrayFormat: "repeat" });
};

export const stringfyPathname = (str?: string[]) => {
  return str?.join("/") ?? "";
};

export const createInternalPath = <
  E extends Pick<RoutesQueryAndPath, "pathnameValue" | "query">,
  T extends `/${string}` = `/${string}`,
>(
  basePath: T,
  option?: { query?: E["query"]; pathname?: E["pathnameValue"] },
) => {
  const path = stringfyPathname(option?.pathname);
  const query = stringfySearchParams(option?.query);
  const questionmark = query.length > 0 ? "?" : "";
  return `${basePath}${path}${questionmark}${query}`;
};
