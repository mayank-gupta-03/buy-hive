import { Hono } from "hono";
import { shouldBeUser } from "../middlewares/auth.middleware";
import { createCheckoutSession } from "../controllers/session.controller";

const sessionRoutes = new Hono();

sessionRoutes.post(
  "/create-checkout-session",
  shouldBeUser,
  createCheckoutSession
);

export default sessionRoutes;
