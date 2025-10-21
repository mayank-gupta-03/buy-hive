import { FastifyReply, FastifyRequest } from "fastify";
import Clerk from "@clerk/fastify";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

export const authMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { userId, isAuthenticated } = Clerk.getAuth(request);
  if (!isAuthenticated) {
    return reply.status(401).send({ message: "Unauthorized" });
  }
  request.userId = userId;
};
