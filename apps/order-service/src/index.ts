import Fastify from "fastify";
import { healthRoutes } from "./routes/health.route";

const app = Fastify({ logger: true });

const API_BASE_URL = "/api/v1";

app.register(healthRoutes, { prefix: `${API_BASE_URL}/health` });

const PORT = Number(process.env.PORT || 4001);

const start = async () => {
  try {
    await app.listen({ port: PORT });
    console.log("order-service is listening on PORT: ", PORT);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
