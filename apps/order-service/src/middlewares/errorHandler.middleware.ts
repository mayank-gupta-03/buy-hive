import { FastifyInstance } from "fastify";

export const errorHandler = (fastify: FastifyInstance) => {
  fastify.setErrorHandler((error, request, reply) => {
    console.error(error);
    reply
      .status(error.statusCode || 500)
      .send({ message: error.message || "Internal Server Error" });
  });
};
