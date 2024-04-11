import { ComponentType, ReactElement, ReactNode, Suspense } from "react";
import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

type ProviderWrapper<Props> = {
  provider: ComponentType<Props>;
  props: Props;
};

export function createWrapper<Wrappers extends Array<ProviderWrapper<any>>>(
  wrappers: Wrappers,
) {
  const testQueryClient = createTestQueryClient();

  return function Wrapper({ children }: { children: ReactNode }): ReactElement {
    const wrappedChildren = wrappers
      .reverse()
      .reduce<ReactNode>(
        (acc, { provider: Provider, props }) => (
          <Provider {...props}>{acc}</Provider>
        ),
        children,
      );

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <QueryClientProvider client={testQueryClient}>
          {wrappedChildren}
        </QueryClientProvider>
      </Suspense>
    );
  };
}
