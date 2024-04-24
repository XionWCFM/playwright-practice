import * as qs from "qs";

export const parseSearchParams = <T extends Record<string, unknown>>(param: string): T => {
  return qs.parse(param.replace(/^\?/, "")) as T;
};

export const stringfySearchParams = (obj: Record<string, unknown>): string => {
  return qs.stringify(obj, { arrayFormat: "repeat" });
};

export const stringfyPathname = (str?: string[]) => {
  return str?.join("/") ?? "";
};
