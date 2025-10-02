import { FastifyInstance } from "fastify";
import { checkHealth } from "../controller/health.controller";

export const healthRoutes = (fastify: FastifyInstance) => {
  fastify.get("/", checkHealth);
};
