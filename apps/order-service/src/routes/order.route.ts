import { FastifyInstance } from "fastify";
import {
  createOrder,
  deleteOrderById,
  getOrderById,
  getOrders,
  getUserOrders,
  updateOrderById,
} from "../controllers/order.controller";
import { shouldBeAdmin, shouldBeUser } from "../middlewares/auth.middleware";

export const orderRoutes = (fastify: FastifyInstance) => {
  fastify.get("/me", { preHandler: shouldBeUser }, getUserOrders);
  fastify.get("/", { preHandler: shouldBeAdmin }, getOrders);
  fastify.get("/:id", { preHandler: shouldBeUser }, getOrderById);
  fastify.post("/", { preHandler: shouldBeUser }, createOrder);
  fastify.put("/:id", { preHandler: shouldBeUser }, updateOrderById);
  fastify.delete("/:id", { preHandler: shouldBeUser }, deleteOrderById);
};
