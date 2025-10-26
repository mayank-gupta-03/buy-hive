import Fastify from "fastify";
import { healthRoutes } from "./routes/health.route";
import Clerk from "@clerk/fastify";
import { testRoutes } from "./routes/test.route";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { orderRoutes } from "./routes/order.route";
import { connectToOrderDB } from "@repo/order-db";

const fastify = Fastify({ logger: true });

const API_BASE_URL = "/api/v1";

fastify.register(errorHandler);
fastify.register(Clerk.clerkPlugin);
fastify.register(healthRoutes, { prefix: `${API_BASE_URL}/health` });
fastify.register(testRoutes, { prefix: `${API_BASE_URL}/test` });
fastify.register(orderRoutes, { prefix: `${API_BASE_URL}/orders` });

const PORT = Number(process.env.PORT || 4001);

const start = async () => {
  try {
    await connectToOrderDB();
    await fastify.listen({ port: PORT });
    console.info("connected to order-db");
    console.info("order-service is listening on PORT: ", PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
