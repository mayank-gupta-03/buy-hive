import { Hono } from "hono";
import { checkHealth } from "../controllers/health.controller";

const healthRoutes = new Hono();

healthRoutes.get("/", checkHealth);

export default healthRoutes;
