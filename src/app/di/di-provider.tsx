import { PropsWithChildren } from "react";
import { ExampleApiService, ExampleContext } from "~/src/entities/example";

const exampleService = new ExampleApiService(fetch);

export const DiProvider = ({ children }: PropsWithChildren) => {
  return (
    <ExampleContext.Provider value={exampleService}>
      {children}
    </ExampleContext.Provider>
  );
};
