import { FastifyReply, FastifyRequest } from "fastify";

export const testAuth = (request: FastifyRequest, reply: FastifyReply) => {
  return reply.send({
    message: "Order service authenticated successfully!",
    userId: request.userId,
  });
};
