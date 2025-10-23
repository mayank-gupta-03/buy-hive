import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  const response = new ApiResponse(
    err.status || 500,
    err.message || "Internal Server Error"
  );

  return res.status(response.status).json(response);
};
