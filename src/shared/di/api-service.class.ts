import { Fetch } from "./fetch.type";

export class ApiService {
  fetch: Fetch;
  constructor(protected inject: Fetch) {
    this.fetch = inject.bind(typeof window === "undefined" ? global : window);
  }
}

export const fetcher = (fetchers: Fetch) => {
  return (url: string, config?: RequestInit) => fetchers(url, config);
};
