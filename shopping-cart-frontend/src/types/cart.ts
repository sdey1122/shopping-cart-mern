import type { Dispatch } from "react";
import type { IProduct } from "./product";

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface ICartState {
  items: ICartItem[];
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: IProduct }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "INCREASE_QTY"; payload: string }
  | { type: "DECREASE_QTY"; payload: string };

export interface ICartContext {
  state: ICartState;
  dispatch: Dispatch<CartAction>;
  cartCount: number;
  totalPrice: number;
}
