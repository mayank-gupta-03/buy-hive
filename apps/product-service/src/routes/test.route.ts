import { Router } from "express";
import { testAuth } from "../controllers/test.controller";

const router = Router();

router.get("/", testAuth);

export default router as Router;
