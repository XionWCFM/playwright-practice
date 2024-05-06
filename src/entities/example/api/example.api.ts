"use client";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { builder } from "~/src/package/composition/builder";
import { Fetch } from "~/src/shared/di/fetch.type";

export const EXAMPLE_END_POINT = {
  default: () => "/api/example",
};

export const EXAMPLE_QUERY_KEY = {
  all: () => ["example"] as const,
  detail: (id: string) => [...EXAMPLE_QUERY_KEY.all(), id],
};

export const createExampleApiService = (injectFetch: Fetch) => {
  return {
    getExample: async () => {
      const response = await injectFetch(`${EXAMPLE_END_POINT.default()}`);
      const result = await response.json();
      return result;
    },
    getDetailExample: async (id: string) => {
      const response = await injectFetch(`${EXAMPLE_END_POINT.default()}`);
      const result = await response.json();
      return result;
    },
  } as const;
};

export type ExampleApiServiceType = ReturnType<typeof createExampleApiService>;

export const exampleQueryOptions = ({ exampleService }: { exampleService: ExampleApiServiceType }) => {
  return {
    all: () =>
      queryOptions({
        queryKey: EXAMPLE_QUERY_KEY.all(),
        queryFn: () => exampleService.getExample(),
      }),
    detail: (id: string) =>
      queryOptions({
        queryKey: EXAMPLE_QUERY_KEY.detail(id),
        queryFn: () => exampleService.getDetailExample(id),
      }),
  };
};

export const [ExampleApiProvider, useExampleApiContext] = builder.context<ExampleApiServiceType>(null);

export const useExampleQuery = () => {
  const exampleService = useExampleApiContext();
  return useSuspenseQuery(exampleQueryOptions({ exampleService }).all());
};
