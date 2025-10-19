import { CartStore, CartStoreActions } from "@/types/cart.type";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create<CartStore & CartStoreActions>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product) =>
        set((state) => ({ cart: [...state.cart, product] })),
      removeFromCart: (product) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== product.id),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
