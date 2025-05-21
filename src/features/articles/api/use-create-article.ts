import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InferRequestType, InferResponseType } from "hono/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.articles)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.articles)["$post"]>;

export const useCreateArticle = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  // データの変更（書き込み）を行う操作
  // useMutationを使用
  // サーバーの状態を変更する操作（POST, PUT, DELETEなど）に使用
  // 成功/失敗時の処理（onSuccess, onError）を明示的に定義
  // キャッシュの無効化（invalidateQueries）など、副作用の管理が可能
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const response = await client.api.articles.$post();

      if (!response.ok) {
        throw new Error("記事の作成に失敗しました");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("記事を作成しました");
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      router.push(`/articles/${data.id}/edit`);
    },
    onError: () => {
      toast.error("記事の作成に失敗しました");
    },
  });

  return mutation;
};
