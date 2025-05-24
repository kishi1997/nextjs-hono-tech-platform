import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetArticles = () => {
  const query = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await client.api.articles.$get();
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
