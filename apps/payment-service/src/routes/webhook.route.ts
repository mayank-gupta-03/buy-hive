import { Hono } from "hono";
import { stripeWebhookEventHandler } from "../controllers/webhook.controller";

const webhookRoutes = new Hono();

webhookRoutes.post("/stripe", stripeWebhookEventHandler);

export default webhookRoutes;
