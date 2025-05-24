import { Hono } from "hono";

import { sessionMiddleware } from "@/lib/session-middleware";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

const app = new Hono()
  /**
   * 認証情報取得API
   */
  .get("/current", sessionMiddleware, async (c) => {
    const session = c.get("session");
    return c.json({ data: session.user });
  })
  /**
   * ユーザー取得API
   */
  .get("/:user_id", sessionMiddleware, async (c) => {
    const userId = c.req.param("user_id");
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    return c.json({ data: user });
  });

export default app;
