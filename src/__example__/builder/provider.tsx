import { PropsWithChildren } from "react";
import { builder } from "../../package/composition/builder";
import { AuthApiProvider, createAuthApiService } from "./auth-api";

const CompositeProvider = builder.tree([
  builder.provider(AuthApiProvider, { value: createAuthApiService(fetch) }),
  builder.provider(AuthApiProvider, { value: createAuthApiService(fetch) }),
  builder.provider(AuthApiProvider, { value: createAuthApiService(fetch) }),
]);

export const Providers = ({ children }: PropsWithChildren) => {
  return <CompositeProvider>{children}</CompositeProvider>;
};
