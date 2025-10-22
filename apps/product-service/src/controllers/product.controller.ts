import { Request, Response } from "express";
import { prisma, Prisma } from "@repo/product-db";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  const response = new ApiResponse(
    200,
    "Products retrieved successfully",
    products
  );

  return res.status(response.status).json(response);
});

export const getProductById = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    const response = new ApiResponse(
      200,
      "Product retrieved successfully",
      product
    );

    return res.status(response.status).json(response);
  }
);

export const createProduct = asyncHandler(
  async (req: Request<{}, {}, Prisma.ProductCreateInput>, res: Response) => {
    const data = req.body;
    const product = await prisma.product.create({ data });

    const response = new ApiResponse(
      201,
      "Product created successfully",
      product
    );

    return res.status(response.status).json(response);
  }
);

export const updateProductById = asyncHandler(
  async (
    req: Request<{ id: string }, {}, Prisma.ProductUpdateInput>,
    res: Response
  ) => {
    const { id } = req.params;
    const data = req.body;
    const product = await prisma.product.update({
      where: { id },
      data,
    });

    const response = new ApiResponse(
      200,
      "Product updated successfully",
      product
    );

    return res.status(response.status).json(response);
  }
);

export const deleteProductById = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const product = await prisma.product.delete({
      where: { id },
    });
    const response = new ApiResponse(
      200,
      "Product deleted successfully",
      product
    );

    return res.status(response.status).json(response);
  }
);
