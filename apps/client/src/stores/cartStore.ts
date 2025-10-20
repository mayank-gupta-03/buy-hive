import { CartStore, CartStoreActions } from "@/types/cart.type";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create<CartStore & CartStoreActions>()(
  persist(
    (set) => ({
      cart: [],
      hasHydrated: false,
      addToCart: (product) =>
        set((state) => {
          const existingIndex = state.cart.findIndex(
            (item) =>
              item.id === product.id &&
              item.selectedColor === product.selectedColor &&
              item.selectedSize === product.selectedSize
          );
          if (existingIndex !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingIndex].quantity += product.quantity || 1;
            return { cart: updatedCart };
          }
          return {
            cart: [
              ...state.cart,
              {
                ...product,
                quantity: product.quantity || 1,
              },
            ],
          };
        }),
      removeFromCart: (product) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) =>
              !(
                item.id === product.id &&
                item.selectedColor === product.selectedColor &&
                item.selectedSize === product.selectedSize
              )
          ),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);

export default useCartStore;
