import { Fetch } from "./fetch.type";

export class ApiService {
  protected fetch: Fetch;
  constructor(fetch: Fetch) {
    this.fetch = fetch;
  }
}
