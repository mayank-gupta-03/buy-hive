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
  const checkoutState = useCheckout();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ConfirmError | null>(null);

  const handleClick = async () => {
    if (checkoutState.type === "success") {
      setLoading(true);

      const { updateEmail, updateShippingAddress } = checkoutState.checkout;

      await updateEmail(shippingForm.email);
      await updateShippingAddress({
        name: "shipping_address",
        address: {
          line1: shippingForm.address,
          city: shippingForm.city,
          country: "IN",
        },
      });

      const res = await checkoutState.checkout.confirm();

      if (res.type === "error") {
        setError(res.error);
      }

      setLoading(false);
    }
  };

  return (
    <form>
      <PaymentElement options={{ layout: "accordion" }} />
      <button disabled={loading} onClick={handleClick} type="button">
        {loading ? "Loading..." : "Pay"}
      </button>
      {error && <div className="">Error: {error.message}</div>}
    </form>
  );
};

export default CheckoutForm;
