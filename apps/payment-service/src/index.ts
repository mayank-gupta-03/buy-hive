import { serve } from "@hono/node-server";
import { Hono } from "hono";
import healthRoutes from "./routes/health.route";
import testRoutes from "./routes/test.route";
import { clerkMiddleware } from "@hono/clerk-auth";

const app = new Hono().basePath("/api/v1");

app.use("*", clerkMiddleware());
app.route("/health", healthRoutes);
app.route("/test", testRoutes);

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
