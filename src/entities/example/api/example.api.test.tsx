import { renderHook, waitFor } from "@testing-library/react";
import {
  ExampleApiService,
  ExampleContext,
  useExampleQuery,
} from "./example.api";
import { createWrapper } from "~/src/shared/testing/testing.util";
describe("", () => {
  let mockFetch: jest.Mock;

  beforeEach(() => {
    mockFetch = jest.fn();
  });

  it("", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ count: 1 }),
    });

    const { result } = renderHook(() => useExampleQuery(), {
      wrapper: createWrapper([
        {
          provider: ExampleContext.Provider,
          props: { value: new ExampleApiService(mockFetch) },
        },
      ]),
    });
    await waitFor(() => {
      expect(result.current.data).toEqual({ count: 1 });
    });

    await waitFor(() => {
      expect(result.current.data).not.toEqual({ count: 2 });
    });
  });
});