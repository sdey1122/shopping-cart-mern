import type { CartAction, ICartState } from "../types/cart";

export const initialCartState: ICartState = { items: [] };

export const cartReducer = (
  state: ICartState,
  action: CartAction,
): ICartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.product._id === action.payload._id,
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product._id === action.payload._id
              ? {
                  ...item,
                  quantity: Math.min(item.quantity + 1, item.product.stock),
                }
              : item,
          ),
        };
      }

      if (action.payload.stock < 1) return state;

      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product._id !== action.payload,
        ),
      };

    case "INCREASE_QTY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.product._id === action.payload
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, item.product.stock),
              }
            : item,
        ),
      };

    case "DECREASE_QTY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.product._id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };

    default:
      return state;
  }
};
