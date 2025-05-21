import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { db } from "@/db";
import { articles } from "@/db/schema";
import { sessionMiddleware } from "@/lib/session-middleware";
import { updateArticleSchema } from "@/features/articles/schemas";

const app = new Hono()
  /**
   * 記事取得API
   */
  .get("/:article_id", sessionMiddleware, async (c) => {
    const articleId = c.req.param("article_id");
    const test = await db
      .select()
      .from(articles)
      .where(eq(articles.id, articleId));
    console.log("🚀 ~ .get ~ test:", test);
    const [article] = await db
      .select()
      .from(articles)
      .where(eq(articles.id, articleId));
    if (article == null) {
      return c.json({ message: "記事が見つかりません : " + articleId }, 404);
    }
    return c.json({ data: article });
  })
  /**
   * 記事作成API
   */
  .post("/", sessionMiddleware, async (c) => {
    const session = c.get("session");

    const [article] = await db
      .insert(articles)
      .values({
        authorId: session.user?.id!,
      })
      .returning();

    return c.json({ data: article });
  })
  /**
   * 記事編集API
   */
  .patch(
    "/:article_id",
    sessionMiddleware,
    zValidator("json", updateArticleSchema),
    async (c) => {
      const session = c.get("session");
      const articleId = c.req.param("article_id");
      const body = await c.req.json();
      const { title, content, icon } = body;
      const [article] = await db
        .select()
        .from(articles)
        .where(eq(articles.id, articleId));
      if (article == null) {
        return c.json({ message: "記事が見つかりません : " + articleId }, 404);
      }
      if (article.authorId !== session.user?.id) {
        return c.json({ message: "記事の編集権限がありません" }, 403);
      }
      const [updatedArticle] = await db
        .update(articles)
        .set({
          title,
          content,
          icon,
          updatedAt: new Date(),
        })
        .where(eq(articles.id, articleId))
        .returning();
      return c.json({
        data: updatedArticle,
      });
    }
  )
  /**
   * 記事公開API
   */
  .patch("/:article_id/publish", sessionMiddleware, async (c) => {
    const session = c.get("session");
    const articleId = c.req.param("article_id");
    const [article] = await db
      .select()
      .from(articles)
      .where(eq(articles.id, articleId));
    if (article == null) {
      return c.json({ message: "記事が見つかりません : " + articleId }, 404);
    }
    if (article.authorId !== session.user?.id) {
      return c.json({ message: "記事の編集権限がありません" }, 403);
    }
    const [updatedArticle] = await db
      .update(articles)
      .set({ publishedAt: new Date(), updatedAt: new Date() })
      .where(eq(articles.id, articleId))
      .returning();
    return c.json({
      data: updatedArticle,
    });
  })
  /**
   * 記事非公開API
   */
  .patch("/:article_id/unpublish", sessionMiddleware, async (c) => {
    const session = c.get("session");
    const articleId = c.req.param("article_id");
    const [article] = await db
      .select()
      .from(articles)
      .where(eq(articles.id, articleId));
    if (article == null) {
      return c.json({ message: "記事が見つかりません : " + articleId }, 404);
    }
    if (article.authorId !== session.user?.id) {
      return c.json({ message: "記事の編集権限がありません" }, 403);
    }
    const [updatedArticle] = await db
      .update(articles)
      .set({ publishedAt: null, updatedAt: new Date() })
      .where(eq(articles.id, articleId))
      .returning();
    return c.json({
      data: updatedArticle,
    });
  })
  /**
   * 記事削除API
   */
  .delete("/:article_id", sessionMiddleware, async (c) => {
    const session = c.get("session");
    const articleId = c.req.param("article_id");
    const [article] = await db
      .select()
      .from(articles)
      .where(eq(articles.id, articleId));
    if (article == null) {
      return c.json({ message: "記事が見つかりません : " + articleId }, 404);
    }
    if (article.authorId !== session.user?.id) {
      return c.json({ message: "記事の編集権限がありません" }, 403);
    }
    await db.delete(articles).where(eq(articles.id, articleId));
    return c.json({
      message: "削除しました" + articleId,
    });
  });
export default app;
