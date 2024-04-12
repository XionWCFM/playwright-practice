import {
  queryOptions,
  useQueries,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";

export const useHI = () => {
  const config = {
    queryKey: ["hello"],
    queryFn: async () => "hello",
    채은짱짱: 0,
  };

  useQueries({ queries: [config] });
  useQuery(config);
};
