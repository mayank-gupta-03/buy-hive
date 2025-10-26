import { Handler } from "hono";
import Stripe from "stripe";
import stripe from "../utils/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;

export const stripeWebhookEventHandler: Handler = async (c) => {
  if (!webhookSecret) {
    return c.json(
      {
        success: false,
        status: 500,
        message:
          "STRIPE_WEBHOOK_SECRET_KEY is not present in the environment variables!",
      },
      500
    );
  }

  const body = await c.req.text();
  const sig = c.req.header("stripe-signature");

  if (!sig) {
    return c.json(
      {
        success: false,
        status: 400,
        message: "Cannot find stripe-signature!",
      },
      400
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook verification failed! ", err);
    return c.json(
      {
        success: false,
        status: 400,
        message: "Webhook verification failed!",
      },
      400
    );
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );
      // TODO: Create Order
      break;
    default:
      break;
  }
  return c.json({
    success: true,
    status: 200,
    message: "Webhook Received!",
    data: {
      received: true,
    },
  });
};
