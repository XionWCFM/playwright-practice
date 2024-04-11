import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});
const config: Config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(test).+(ts|tsx|js)"],

  clearMocks: true,

  collectCoverage: true,

  coverageDirectory: "coverage",

  coveragePathIgnorePatterns: ["/node_modules/"],

  coverageProvider: "babel",
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/$1",
  },
  fakeTimers: {
    enableGlobally: false,
  },
  roots: ["<rootDir>"],

  testEnvironment: "jest-environment-jsdom",

  testPathIgnorePatterns: ["/node_modules/"],

  transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\/]+$"],
};

export default createJestConfig(config);
