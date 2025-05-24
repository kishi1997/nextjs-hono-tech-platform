"use client";

import React from "react";
import { useGetArticle } from "../api/use-get-article";
import { Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { useArticleId } from "../hooks/use-article-id";

export const ArticleDetail = () => {
  const id = useArticleId();
  const { data: article, isLoading } = useGetArticle(id);

  if (isLoading) {
    return (
      <div className="w-full mt-72 flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="w-full mt-64 flex justify-center items-center">
        記事が見つかりません
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* メインコンテンツ */}
      <div className="max-w-4xl mx-auto px-4 py-8 mt-8">
        <Card className="shadow-lg">
          <CardHeader className="pb-6">
            {/* アイコンとタイトル */}
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl">{article.icon}</div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                  {article.title}
                </h1>
              </div>
            </div>
            {/* メタ情報 */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-2">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  作成日: {article?.publishedAt?.split("T")[0]}
                </span>
              </div>
            </div>
            <Separator />
          </CardHeader>

          <CardContent className="pb-8">
            {/* 記事内容 */}
            <div className="prose prose-lg max-w-none">{article.content}</div>

            {/* フッター */}
            <div className="mt-12 pt-6 border-t">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  この記事は役に立ちましたか？
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    👍 役に立った
                  </Button>
                  <Button variant="outline" size="sm">
                    👎 役に立たなかった
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
