export type Fetch = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;
export type FetchArg = [RequestInfo | URL, RequestInit | undefined];
export type FetchReturn = Promise<Response>;
