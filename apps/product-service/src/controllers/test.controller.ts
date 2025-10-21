import { Request, Response } from "express";

export const testAuth = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Product service authenticated successfully!",
    userId: req.userId,
  });
};
