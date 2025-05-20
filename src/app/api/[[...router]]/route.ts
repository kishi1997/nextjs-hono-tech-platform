import { Hono } from "hono";
import { handle } from "hono/vercel";
import { logger } from "hono/logger";
import authentication from "@/features/auth/server/route";
const app = new Hono().basePath("/api");

app.use("*", logger());
const routes = app.route("/authentication", authentication);
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
