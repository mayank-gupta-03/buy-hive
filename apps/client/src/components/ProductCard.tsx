"use client";

import useCartStore from "@/stores/cartStore";
import { Product } from "@/types/product.type";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [productTypes, setProductTypes] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });
  const { addToCart } = useCartStore();

  const handleProductType = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      ...product,
      selectedSize: productTypes.size,
      selectedColor: productTypes.color,
      quantity: 1,
    });
    toast.success("Product added to cart");
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      {/* IMAGE */}
      <Link href={`/products/${product.id}}`}>
        <div className="relative aspect-[2/3] hover:scale-105 transition-all duration-300">
          <Image
            src={product.images[productTypes.color]}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </Link>
      {/* PRODUCT DETAIL */}
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-medium">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.shortDescription}</p>
        {/* PRODUCT TYPES */}
        <div className="flex items-center gap-4 text-xs">
          {/* SIZES */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Size</span>
            <select
              name="size"
              id="size"
              className="ring ring-gray-300 rounded-md px-2 py-1"
              onChange={(e) =>
                handleProductType({ type: "size", value: e.target.value })
              }
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          {/* COLORS */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Colors</span>
            <div className="flex items-center gap-2">
              {product.colors.map((color) => (
                <div
                  className={`cursor-pointer border-1 rounded-full p-[1.2px] ${productTypes.color === color ? "border-gray-400" : "border-gray-200"}`}
                  key={color}
                  onClick={() =>
                    handleProductType({ type: "color", value: color })
                  }
                >
                  <div
                    className="w-[14px] h-[14px] rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium">${product.price}</p>
          <button
            className="ring-1 ring-gray-200 cursor-pointer rounded-md px-2 py-1 hover:bg-black hover:text-white text-sm transition-all duration-300 flex gap-2 items-center"
            onClick={() => handleAddToCart(product)}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
