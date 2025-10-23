import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from "../controllers/product.controller";
import { shouldBeAdmin, shouldBeUser } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", shouldBeUser, getProducts);
router.get("/:id", shouldBeUser, getProductById);
router.post("/", shouldBeAdmin, createProduct);
router.put("/:id", shouldBeAdmin, updateProductById);
router.delete("/:id", shouldBeAdmin, deleteProductById);

export default router as Router;
