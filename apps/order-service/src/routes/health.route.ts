import { FastifyInstance } from "fastify";
import { checkHealth } from "../controllers/health.controller";

export const healthRoutes = (fastify: FastifyInstance) => {
  fastify.get("/", checkHealth);
};
