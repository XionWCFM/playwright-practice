"use client";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ApiService } from "~/src/shared/di/api-service.class";
import { contextGenerator } from "~/src/shared/di/context-genrator";

export const EXAMPLE_END_POINT = {
  default: "/api/example",
};

export const EXAMPLE_QUERY_KEY = {
  all: ["example"] as const,
  detail: (id: string) => [...EXAMPLE_QUERY_KEY.all, id],
};

export class ExampleApiService extends ApiService {
  async getExample() {
    const response = await this.fetch(`${EXAMPLE_END_POINT.default}`);
    const result = await response.json();
    return result;
  }
  async getDetailExample(id: string) {
    const response = await this.fetch(
      `${EXAMPLE_END_POINT.default}?value=${id}`,
    );
    const result = await response.json();
    return result;
  }
  async postExample(id: string) {
    const response = await this.fetch(
      `${EXAMPLE_END_POINT.default}?value=${id}`,
      {
        method: "POST",
      },
    );
    const result = await response.json();
    return result;
  }
}

export const EXAMPLE_QUERY_OPTIONS = ({
  exampleService,
}: {
  exampleService: ExampleApiService;
}) => {
  return {
    all: () =>
      queryOptions({
        queryKey: EXAMPLE_QUERY_KEY.all,
        queryFn: () => exampleService.getExample(),
      }),
    detail: (id: string) =>
      queryOptions({
        queryKey: EXAMPLE_QUERY_KEY.detail(id),
        queryFn: () => exampleService.getDetailExample(id),
      }),
  };
};

export const ExampleContext = contextGenerator<ExampleApiService>(null);
export const useExampleContext = ExampleContext.useContext;

export const useExampleQuery = () => {
  const exampleService = useExampleContext();
  return useSuspenseQuery(EXAMPLE_QUERY_OPTIONS({ exampleService }).all());
};
