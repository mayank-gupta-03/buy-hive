import { Request, Response } from "express";
import { prisma, Prisma } from "@repo/product-db";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { SearchParams } from "../types/searchParams.type";

export const getProducts = async (
  req: Request<{}, {}, {}, SearchParams>,
  res: Response
) => {
  const { category, limit, search, sort } = req.query;

  const orderBy = () => {
    switch (sort) {
      case "asc":
        return { price: Prisma.SortOrder.asc };
      case "desc":
        return { price: Prisma.SortOrder.desc };
      case "oldest":
        return { createdAt: Prisma.SortOrder.asc };
      default:
        return { createdAt: Prisma.SortOrder.desc };
    }
  };

  const products = await prisma.product.findMany({
    where: {
      ...(category && { categorySlug: category }),
      ...(search && { name: { contains: search, mode: "insensitive" } }),
    },
    orderBy: orderBy(),
    take: limit ? Number(limit) : undefined,
  });
  const response = new ApiResponse(
    200,
    "Products retrieved successfully",
    products
  );

  return res.status(response.status).json(response);
};

export const getProductById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
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
};

export const createProduct = async (
  req: Request<{}, {}, Prisma.ProductCreateInput>,
  res: Response
) => {
  const data = req.body;
  const { images, colors } = data;

  if (!colors || !Array.isArray(colors) || colors.length === 0) {
    const response = new ApiResponse(
      400,
      "At least one color must be provided"
    );
    return res.status(response.status).json(response);
  }

  if (!images || typeof images !== "object") {
    const response = new ApiResponse(400, "Images must be provided");
    return res.status(response.status).json(response);
  }

  const missingColors = colors.filter((color) => !(color in images));

  if (missingColors.length > 0) {
    const response = new ApiResponse(
      400,
      `Images for the following colors are missing: ${missingColors.join(", ")}`
    );
    return res.status(response.status).json(response);
  }

  const product = await prisma.product.create({ data });
  const response = new ApiResponse(
    201,
    "Product created successfully",
    product
  );

  return res.status(response.status).json(response);
};

export const updateProductById = async (
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
};

export const deleteProductById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
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
};
