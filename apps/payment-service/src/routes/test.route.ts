import { Hono } from "hono";
import { testAuth } from "../controllers/test.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const healthRoutes = new Hono();

healthRoutes.get("/", authMiddleware, testAuth);

export default healthRoutes;
