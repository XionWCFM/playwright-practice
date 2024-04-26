import { builder } from "~/src/package/composition/builder";
import { Fetch } from "~/src/shared/di/fetch.type";

export const createAuthApiService = (ifetch: Fetch) => ({
  login: async () => {
    const response = await ifetch("/api/login");
    const result = await response.json();
    return result;
  },
  logout: async () => {
    const response = await ifetch("/api/logout");
    const result = await response.json();
    return result;
  },
  signUp: async () => {
    const response = await ifetch("/api/sign-up");
    const result = await response.json();
    return result;
  },
  signOut: async () => {
    const response = await ifetch("/api/sign-out");
    const result = await response.json();
    return result;
  },
});

export type AuthApiContext = ReturnType<typeof createAuthApiService>;

export const [AuthApiProvider, useAuthApiContext] = builder.context<AuthApiContext>(null);
