export const exampleApiService = () => {
  return {
    getExample: async () => {
      const response = await fetch("/api/hello");
      const result = await response.json();
      return result;
    },
  };
};
