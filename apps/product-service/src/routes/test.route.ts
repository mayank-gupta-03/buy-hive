import { Router } from "express";
import { testAuth } from "../controllers/test.controller";
import { shouldBeUser } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", shouldBeUser, testAuth);

export default router as Router;
