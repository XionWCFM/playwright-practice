export const EXAMPLE_2_FACTORY = {
  default: () => ["example2"],
  getExample: () => [...EXAMPLE_2_FACTORY.default(), "hello-world"],
};
