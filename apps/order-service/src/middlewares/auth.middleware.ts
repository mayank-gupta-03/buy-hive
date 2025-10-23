import { FastifyReply, FastifyRequest } from "fastify";
import Clerk from "@clerk/fastify";
import { ApiResponse } from "../utils/ApiResponse";
import { CustomJwtSessionClaims } from "@repo/types";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

export const shouldBeUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { userId, isAuthenticated } = Clerk.getAuth(request);

  if (!isAuthenticated) {
    const response = new ApiResponse(401, "Unauthorized");
    return reply.status(response.status).send(response);
  }

  request.userId = userId;
};

export const shouldBeAdmin = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { userId, isAuthenticated, sessionClaims } = Clerk.getAuth(request);

  if (!isAuthenticated) {
    const response = new ApiResponse(401, "Unauthorized");
    return reply.status(response.status).send(response);
  }

  const claims = sessionClaims as CustomJwtSessionClaims;

  if (claims.metadata?.role !== "admin") {
    const response = new ApiResponse(403, "Forbidden");
    return reply.status(response.status).send(response);
  }

  request.userId = userId;
};
