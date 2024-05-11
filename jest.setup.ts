import "@testing-library/jest-dom";
import { server } from "./src/shared/mocks/node";
import jestFetchMock from "jest-fetch-mock";
jestFetchMock.enableMocks();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
