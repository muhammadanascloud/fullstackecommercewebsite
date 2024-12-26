import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const useStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      addToCart: (item) =>
        set((state) => ({
          cartItems: [...state.cartItems, item],
        })),
      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage", // Key for localStorage
    }
  )
);

export default useStore;
