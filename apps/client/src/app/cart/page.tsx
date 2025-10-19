"use client";

import PaymentForm from "@/components/PaymentForm";
import ShippingForm from "@/components/ShippingForm";
import { STEPS } from "@/mock/cart.data";
import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { ShippingForm as ShippingFormInputs } from "@/types/shippingForm.type";
import useCartStore from "@/stores/cartStore";
import { CartItem } from "@/types/cart.type";

const Cart = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shippingForm, setShippingForm] = useState<ShippingFormInputs | null>(
    null
  );
  const { cart, removeFromCart } = useCartStore();

  const activeStep = parseInt(searchParams.get("step") || "1");

  const handleStepChange = (step: number) => {
    router.push(`/cart?step=${step}`, { scroll: false });
  };

  const handleShippingSubmit = (data: ShippingFormInputs) => {
    setShippingForm(data);
  };

  const subTotal = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  // need to change the logic
  const total = subTotal;

  const handleRemoveFromCart = (product: CartItem) => {
    removeFromCart(product);
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-12">
      {/* TITLE */}
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>
      {/* STEPS */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {STEPS.map((step) => (
          <div
            key={step.id}
            className={`flex items-center gap-2 border-b-2 pb-4 ${activeStep === step.id ? "border-gray-800" : "border-gray-200"}`}
          >
            <div
              className={`w-6 h-6 rounded-full text-white p-4 flex items-center justify-center ${activeStep === step.id ? "bg-gray-800" : "bg-gray-400"}`}
            >
              {step.id}
            </div>
            <p
              className={`text-sm font-medium ${activeStep === step.id ? "text-gray-800" : "text-gray-400"}`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>
      {/* STEPS & DETAILS */}
      <div className="w-full flex flex-col lg:flex-row gap-16">
        {/* STEPS */}
        <div className="w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8">
          {activeStep === 1 ? (
            cart.map((item) => (
              // SINGLE CART ITEM
              <div
                key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                className="flex items-center justify-between"
              >
                {/* IMAGE AND. DETAILS */}
                <div className="flex gap-8">
                  {/* IMAGE */}
                  <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={item.images[item.selectedColor]}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* DETAILS */}
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-xs text-gray-500">
                        Size: {item.selectedSize}
                      </p>
                      <p className="text-xs text-gray-500">
                        Color: {item.selectedColor}
                      </p>
                    </div>
                    <p className="font-medium">${item.price}</p>
                  </div>
                </div>
                {/* DELETE BUTTON */}
                <button
                  className="w-8 h-8 rounded-full bg-red-100 text-red-400 flex items-center justify-center cursor-pointer hover:bg-red-200 transition-all duration-300"
                  onClick={() => handleRemoveFromCart(item)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : activeStep === 2 ? (
            <ShippingForm handleFormChange={handleShippingSubmit} />
          ) : activeStep === 3 && shippingForm ? (
            <PaymentForm />
          ) : (
            <p className="text-sm text-gray-500">
              Please fill in the shipping form to continue.
            </p>
          )}
        </div>
        {/* DETAILS */}
        <div className="w-full lg:w-5/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max">
          <h2 className="font-semibold">Cart Details</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Subtotal</p>
              <p className="font-medium">${subTotal}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Discount(10%)</p>
              <p className="font-medium">$10</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Shipping Fee</p>
              <p className="font-medium">$10</p>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between">
              <p className="text-gray-800 font-semibold">Total</p>
              <p className="font-medium">${total}</p>
            </div>
          </div>
          {activeStep === 1 && (
            <button
              className="w-full bg-gray-800 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-900 transition-all duration-300"
              onClick={() => handleStepChange(2)}
            >
              Continue
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
