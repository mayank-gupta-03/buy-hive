import { serve } from "@hono/node-server";
import { Hono } from "hono";
import healthRoutes from "./routes/health.route";

const app = new Hono().basePath("/api/v1");

app.route("/health", healthRoutes);

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
