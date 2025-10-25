import { Handler } from "hono";
import stripe from "../utils/stripe";
import { CartList } from "@repo/types";
import { getStripeProductPrice } from "../utils/stripeProduct";

export const createCheckoutSession: Handler = async (c) => {
  const { cart }: { cart: CartList } = await c.req.json();
  const userId = c.get("userId");

  const lineItems = await Promise.all(
    cart.map(async (item) => {
      const unitAmount = await getStripeProductPrice(item.id);
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: unitAmount as number,
        },
        quantity: item.quantity,
      };
    })
  );

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      // TODO: Remove hardcoded data after project completion
      // [
      //   {
      //     price_data: {
      //       currency: "inr",
      //       product_data: {
      //         name: "test product 1",
      //       },
      //       unit_amount: 60000,
      //     },
      //     quantity: 1,
      //   },
      // ],
      client_reference_id: userId,
      mode: "payment",
      ui_mode: "custom",
      return_url:
        "http://localhost:3000/return?session_id={CHECKOUT_SESSION_ID}",
    });

    return c.json({ checkoutSessionClientSecret: session.client_secret });
  } catch (err) {
    console.error(err);
    return c.json({ error: err });
  }
};

export const getSessionDetails: Handler = async (c) => {
  const { sessionId } = c.req.param();
  const session = await stripe.checkout.sessions.retrieve(sessionId as string);

  c.status(200);
  return c.json({
    success: true,
    status: 200,
    message: "Session details retrieved successfully!",
    data: {
      status: session.status,
      paymentStatus: session.payment_status,
    },
  });
};
