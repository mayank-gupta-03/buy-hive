import { StripeProductType } from "@repo/types";
import stripe from "./stripe";

export const createStripeProduct = async (item: StripeProductType) => {
  try {
    const response = await stripe.products.create({
      id: item.id,
      name: item.name,
      default_price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
      },
    });

    return response;
  } catch (err) {
    console.error("Error creating Stripe product:", err);
  }
};

export const getStripeProductPrice = async (productId: string) => {
  try {
    const response = await stripe.prices.list({
      product: productId,
    });

    return response.data[0]?.unit_amount;
  } catch (err) {
    console.error("Error retrieving Stripe product price:", err);
  }
};
