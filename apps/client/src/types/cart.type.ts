import { CartList, CartItem } from "@repo/types";

export type CartStep = {
  id: number;
  title: string;
};

export type CartStepList = CartStep[];

export type CartStore = {
  cart: CartList;
  hasHydrated: boolean;
};

export type CartStoreActions = {
  addToCart: (product: CartItem) => void;
  removeFromCart: (product: CartItem) => void;
  clearCart: () => void;
};
