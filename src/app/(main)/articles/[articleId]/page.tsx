"use client";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { ArticleDetail } from "@/features/articles/components/article-detail";
import { ArrowLeftIcon, Bookmark, Share2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <Container>
      {/* ヘッダー */}
      <Container>
        <div className="flex items-center justify-between">
          <Link href="/home">
            <Button variant="outline">
              <ArrowLeftIcon className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" />
              シェア
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Bookmark className="w-4 h-4" />
              保存
            </Button>
          </div>
        </div>
      </Container>
      <ArticleDetail />
    </Container>
  );
};

export default page;
