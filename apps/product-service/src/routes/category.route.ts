import { Router } from "express";
import {
  createCategory,
  deleteCategoryById,
  getCategories,
  getCategoryById,
  updateCategoryById,
} from "../controllers/category.controller";
import { shouldBeAdmin, shouldBeUser } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", shouldBeUser, getCategories);
router.get("/:id", shouldBeUser, getCategoryById);
router.post("/", shouldBeAdmin, createCategory);
router.put("/:id", shouldBeAdmin, updateCategoryById);
router.delete("/:id", shouldBeAdmin, deleteCategoryById);

export default router as Router;
