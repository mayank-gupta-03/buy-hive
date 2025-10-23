import { Hono } from "hono";
import { testAuth } from "../controllers/test.controller";
import { shouldBeUser } from "../middlewares/auth.middleware";

const healthRoutes = new Hono();

healthRoutes.get("/", shouldBeUser, testAuth);

export default healthRoutes;
