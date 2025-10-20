"use client";

import useCartStore from "@/stores/cartStore";
import { Product } from "@/types/product.type";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  product: Product;
  selectedSize: string;
  selectedColor: string;
}

const ProductInteraction = ({
  product,
  selectedColor,
  selectedSize,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCartStore();

  const handleTypeChange = (type: "size" | "color", value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleQuantityChange = (type: "increment" | "decrement") => {
    switch (type) {
      case "increment":
        setQuantity((prev) => prev + 1);
        break;
      case "decrement":
        setQuantity((prev) => {
          if (prev === 1) return 1;
          return prev - 1;
        });
        break;
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    });
    toast.success("Product added to cart!");
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* SIZE */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Size</span>
        <div className="flex items-center gap-2">
          {product.sizes.map((size) => (
            <div
              key={size}
              className={`cursor-pointer border-1 ${selectedSize === size ? "border-gray-600" : "border-gray-300"} p-[2px]`}
              onClick={() => handleTypeChange("size", size)}
            >
              <div
                className={`w-6 h-6 ${selectedSize === size ? "bg-black text-white" : "bg-white text-black"} flex items-center justify-center text-center`}
              >
                {size.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* COLOR */}
      <div className="flex flex-col gap-2 text-sm"></div>
      <span className="text-gray-500">Color</span>
      <div className="flex items-center gap-2">
        {product.colors.map((color) => (
          <div
            key={color}
            className={`cursor-pointer border-1 ${selectedColor === color ? "border-gray-300" : "border-white"} p-[2px]`}
            onClick={() => handleTypeChange("color", color)}
          >
            <div
              className={`w-6 h-6`}
              style={{
                backgroundColor: color,
              }}
            />
          </div>
        ))}
      </div>
      {/* QUANTITY */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Quantity</span>
        <div className="flex items-center gap-2">
          <button
            className="cursor-pointer border-1 border-gray-300 p-1"
            onClick={() => handleQuantityChange("decrement")}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="">{quantity}</span>
          <button
            className="cursor-pointer border-1 border-gray-300 p-1"
            onClick={() => handleQuantityChange("increment")}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <button
        className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm font-medium"
        onClick={handleAddToCart}
      >
        <Plus className="w-4 h-4" />
        Add to Cart
      </button>
      <button className="ring-1 ring-gray-400 shadow-lg text-gray-800 px-4 py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer text-sm font-medium">
        <ShoppingCart />
        But this Item
      </button>
    </div>
  );
};

export default ProductInteraction;
