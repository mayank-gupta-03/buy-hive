import { Product } from "./product.type";

export type CartStep = {
  id: number;
  title: string;
};

export type CartStepList = CartStep[];

export type CartItem = Product & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

export type CartList = CartItem[];
