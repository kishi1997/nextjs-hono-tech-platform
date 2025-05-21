import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetArticle = (articleId: string) => {
  // データの取得（読み取り）を行う
  // useQueryを使用
  // キャッシュ可能で、同じデータを何度も取得する必要がある場合に効率的
  // 自動的にキャッシュの管理や再取得のロジックを提供
  const query = useQuery({
    queryKey: ["articles", articleId],
    queryFn: async () => {
      const response = await client.api.articles[":article_id"].$get({
        param: {
          article_id: articleId,
        },
      });

      if (!response.ok) {
        throw new Error("記事の取得に失敗しました");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
