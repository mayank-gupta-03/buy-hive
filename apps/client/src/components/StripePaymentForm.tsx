"use client";

import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { ShippingForm } from "@/types/shippingForm.type";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { CartList } from "@repo/types";
import useCartStore from "@/stores/cartStore";

interface Props {
  shippingForm: ShippingForm;
}

export const stripe = loadStripe(
  "pk_test_51PBI8JSCnT8c4PrnUK0nWTznzZTX3Y1zbFWZ7fYDbkwvTrnkcadOiFqPOPKlWU49krWPRiKrqP0yvoQ1TokCxhSe00KIFn3J05"
);

const getClientSecret = async (cart: CartList, token: string) => {
  const API_URL = `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/${process.env.NEXT_PUBLIC_API_BASE_URL}`;
  return fetch(`${API_URL}/sessions/create-checkout-session`, {
    method: "POST",
    body: JSON.stringify({ cart }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((json) => json.checkoutSessionClientSecret);
};

const StripePaymentForm = ({ shippingForm }: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const { getToken } = useAuth();
  const { cart } = useCartStore();

  useEffect(() => {
    getToken().then((newToken) => setToken(newToken));
  }, []);

  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <CheckoutProvider
      stripe={stripe}
      options={{ clientSecret: getClientSecret(cart, token) }}
    >
      <CheckoutForm shippingForm={shippingForm} />
    </CheckoutProvider>
  );
};

export default StripePaymentForm;
