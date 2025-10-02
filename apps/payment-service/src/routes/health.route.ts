import { Hono } from "hono";
import { checkHealth } from "../controller/health.controller";

const healthRoutes = new Hono();

healthRoutes.get("/", checkHealth);

export default healthRoutes;
