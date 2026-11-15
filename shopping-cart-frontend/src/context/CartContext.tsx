import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { cartReducer, initialCartState } from "../reducer/cartReducer";
import type { ICartContext } from "../types/cart";

const CartContext = createContext<ICartContext | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const cartCount = useMemo(
    () => state.items.reduce((total, item) => total + item.quantity, 0),
    [state.items],
  );

  const totalPrice = useMemo(
    () =>
      state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),
    [state.items],
  );

  return (
    <CartContext.Provider value={{ state, dispatch, cartCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): ICartContext => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};
