import { FastifyInstance } from "fastify";
import { testAuth } from "../controllers/test.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const testRoutes = (fastify: FastifyInstance) => {
  fastify.get("/", { preHandler: authMiddleware }, testAuth);
};
