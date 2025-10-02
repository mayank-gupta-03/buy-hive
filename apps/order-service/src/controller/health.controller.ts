import { FastifyReply, FastifyRequest } from "fastify";

export const checkHealth = (request: FastifyRequest, reply: FastifyReply) => {
  reply.status(200).send({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
};
