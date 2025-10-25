import { Hono } from "hono";
import { shouldBeUser } from "../middlewares/auth.middleware";
import {
  createCheckoutSession,
  getSessionDetails,
} from "../controllers/session.controller";

const sessionRoutes = new Hono();

sessionRoutes.post(
  "/create-checkout-session",
  shouldBeUser,
  createCheckoutSession
);

sessionRoutes.get("/:sessionId", getSessionDetails);

export default sessionRoutes;
