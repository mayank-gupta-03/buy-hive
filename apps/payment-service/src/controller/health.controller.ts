import { Handler } from "hono";

export const checkHealth: Handler = (c) => {
  return c.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
};
