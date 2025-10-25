import { serve } from "@hono/node-server";
import { Hono } from "hono";
import healthRoutes from "./routes/health.route";
import testRoutes from "./routes/test.route";
import sessionRoutes from "./routes/session.route";
import { clerkMiddleware } from "@hono/clerk-auth";
import { cors } from "hono/cors";

const app = new Hono().basePath("/api/v1");

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("*", clerkMiddleware());
app.route("/health", healthRoutes);
app.route("/test", testRoutes);
app.route("/sessions", sessionRoutes);

const PORT = Number(process.env.PORT || 4002);

const start = async () => {
  try {
    serve(
      {
        fetch: app.fetch,
        port: PORT,
      },
      (info) => {
        console.log("payment-service is listening on PORT: ", PORT);
      }
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();
