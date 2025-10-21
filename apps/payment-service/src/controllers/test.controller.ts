import { Handler } from "hono";

export const testAuth: Handler = (c) => {
  return c.json({
    message: "Order service authenticated successfully!",
    userId: c.get("userId"),
  });
};
