import { Hono } from "hono";
import { handle } from "hono/vercel";
import { logger } from "hono/logger";
import authentication from "@/features/auth/server/route";
import articles from "@/features/articles/server/route";
const app = new Hono().basePath("/api");

// # Start of Selection
// ログを使用するミドルウェアを全てのルートに適用
app.use("*", logger());

// ルートを定義
const routes = app
  .route("/authentication", authentication) // 認証関連のルート
  .route("/articles", articles); // 記事関連のルート

// HTTPメソッドに対するハンドラーをエクスポート
export const GET = handle(app); // GETリクエストのハンドラー
export const POST = handle(app); // POSTリクエストのハンドラー
export const PATCH = handle(app); // PATCHリクエストのハンドラー
export const DELETE = handle(app); // DELETEリクエストのハンドラー

// ルートの型を定義
export type AppType = typeof routes;
