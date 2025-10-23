import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import { CustomJwtSessionClaims } from "@repo/types";
import { ApiResponse } from "../utils/ApiResponse";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const shouldBeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = getAuth(req);
  const { userId, isAuthenticated } = auth;
  if (!isAuthenticated) {
    const response = new ApiResponse(401, "Unauthorized");
    return res.status(response.status).json(response);
  }
  req.userId = userId;
  next();
};

export const shouldBeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = getAuth(req);
  const { userId, isAuthenticated, sessionClaims } = auth;

  if (!isAuthenticated) {
    const response = new ApiResponse(401, "Unauthorized");
    return res.status(response.status).json(response);
  }

  const claims = sessionClaims as CustomJwtSessionClaims;

  if (claims.metadata?.role !== "admin") {
    const response = new ApiResponse(403, "Forbidden");
    return res.status(response.status).json(response);
  }

  req.userId = userId;
  next();
};
