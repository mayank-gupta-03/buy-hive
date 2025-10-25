import { Handler } from "hono";
import stripe from "../utils/stripe";

export const createCheckoutSession: Handler = async (c) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-shirt",
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      ui_mode: "custom",
      // The URL of your payment completion page
      return_url: "https://example.com/return?session_id={CHECKOUT_SESSION_ID}",
    });

    c.json({ checkoutSessionClientSecret: session.client_secret });
  } catch (err) {
    console.error(err);
    c.json({ error: err });
  }
};
