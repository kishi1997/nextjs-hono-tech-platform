import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = (userId: string) => {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await client.api.authentication[":user_id"].$get({
        param: {
          user_id: userId,
        },
      });
      if (!res.ok) {
        return null;
      }
      const { data } = await res.json();
      return data;
    },
  });
  return query;
};
