"use client";

import { ShippingForm } from "@/types/shippingForm.type";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useCheckout } from "@stripe/react-stripe-js/checkout";
import { ConfirmError } from "@stripe/stripe-js";
import { useState } from "react";

interface Props {
  shippingForm: ShippingForm;
}

const CheckoutForm = ({ shippingForm }: Props) => {
  const checkout = useCheckout();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ConfirmError | null>(null);

  if (checkout.type === "loading") {
    return <div>Loading...</div>;
  } else if (checkout.type === "error") {
    return <div>Error: {checkout.error.message}</div>;
  }

  const handleClick = async () => {
    setLoading(true);
    await checkout.checkout.updateEmail(shippingForm.email);
    await checkout.checkout.updateShippingAddress({
      name: "shipping_address",
      address: {
        line1: shippingForm.address,
        city: shippingForm.city,
        country: "US",
      },
    });

    const res = await checkout.checkout.confirm();
    if (res.type === "error") {
      setError(res.error);
    }
    setLoading(false);
  };

  return (
    <form>
      <PaymentElement options={{ layout: "accordion" }} />
      <button disabled={loading} onClick={handleClick}>
        {loading ? "Loading..." : "Pay"}
      </button>
      {error && <div className="">Error: {error.message}</div>}
    </form>
  );
};

export default CheckoutForm;
