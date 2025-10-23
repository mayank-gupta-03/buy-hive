import { Request, Response } from "express";
import { prisma, Prisma } from "@repo/product-db";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  const response = new ApiResponse(
    200,
    "Categories fetched successfully",
    categories
  );

  return res.status(200).json(response);
};

export const getCategoryById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const response = new ApiResponse(
    200,
    "Category fetched successfully",
    category
  );

  return res.status(200).json(response);
};

export const createCategory = async (
  req: Request<{}, {}, Prisma.CategoryCreateInput>,
  res: Response
) => {
  const data = req.body;
  const category = await prisma.category.create({ data });
  const response = new ApiResponse(
    201,
    "Category created successfully",
    category
  );

  return res.status(201).json(response);
};

export const updateCategoryById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  const data = req.body;
  const category = await prisma.category.update({
    where: { id },
    data,
  });
  const response = new ApiResponse(
    200,
    "Category updated successfully",
    category
  );

  return res.status(200).json(response);
};

export const deleteCategoryById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  const category = await prisma.category.delete({
    where: { id },
  });
  const response = new ApiResponse(
    200,
    "Category deleted successfully",
    category
  );

  return res.status(200).json(response);
};
