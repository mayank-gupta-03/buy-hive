import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from "../controllers/product.controller";
import { shouldBeAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", shouldBeAdmin, createProduct);
router.put("/:id", shouldBeAdmin, updateProductById);
router.delete("/:id", shouldBeAdmin, deleteProductById);

export default router as Router;
