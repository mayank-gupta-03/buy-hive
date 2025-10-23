import { FastifyReply, FastifyRequest } from "fastify";
import { Order } from "@repo/order-db";
import { ApiResponse } from "../utils/ApiResponse";

export const getUserOrders = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const userId = request.userId;
  const orders = await Order.find({ userId });
  const response = new ApiResponse(200, "Orders fetched successfully", orders);
  return reply.status(response.status).send(response);
};

export const getOrders = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const orders = await Order.find();
  const response = new ApiResponse(200, "Orders fetched successfully", orders);
  return reply.status(response.status).send(response);
};

export const getOrderById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {};

export const createOrder = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {};

export const updateOrderById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {};

export const deleteOrderById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {};
