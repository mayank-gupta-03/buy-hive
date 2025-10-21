import Fastify from "fastify";
import { healthRoutes } from "./routes/health.route";
import Clerk from "@clerk/fastify";
import { testRoutes } from "./routes/test.route";

const fastify = Fastify({ logger: true });

const API_BASE_URL = "/api/v1";

fastify.register(Clerk.clerkPlugin);
fastify.register(healthRoutes, { prefix: `${API_BASE_URL}/health` });
fastify.register(testRoutes, { prefix: `${API_BASE_URL}/test` });

const PORT = Number(process.env.PORT || 4001);

const start = async () => {
  try {
    await fastify.listen({ port: PORT });
    console.log("order-service is listening on PORT: ", PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
