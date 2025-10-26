import type { Product } from "@repo/product-db";

export type CartItem = Product & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

export type CartList = CartItem[];
