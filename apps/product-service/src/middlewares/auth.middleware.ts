import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = getAuth(req);
  const { userId, isAuthenticated } = auth;
  if (!isAuthenticated) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.userId = userId;
  next();
};
