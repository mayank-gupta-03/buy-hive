import { getAuth } from "@hono/clerk-auth";
import { createMiddleware } from "hono/factory";

export const authMiddleware = createMiddleware<{
  Variables: { userId: string };
}>(async (c, next) => {
  const auth = getAuth(c);
  if (!auth?.isAuthenticated) {
    return c.json({ message: "Unauthenticated" }, 401);
  }
  c.set("userId", auth.userId);
  await next();
});
