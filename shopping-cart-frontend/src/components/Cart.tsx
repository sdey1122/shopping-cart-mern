import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { state, dispatch, totalPrice } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow-sm">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <p className="mt-2 text-slate-500">Add some products to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <div className="space-y-3">
        {state.items.map(({ product, quantity }) => (
          <article
            key={product._id}
            className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-24 w-full rounded-lg object-cover sm:w-28"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-slate-900">{product.name}</h3>
              <p className="mt-1 text-sm text-slate-500">
                ₹{product.price.toLocaleString("en-IN")} each
              </p>
              <p className="mt-1 font-semibold">
                ₹{(product.price * quantity).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                aria-label="Decrease quantity"
                onClick={() =>
                  dispatch({ type: "DECREASE_QTY", payload: product._id })
                }
                className="rounded-md border p-2 hover:bg-slate-50"
              >
                <Minus size={16} />
              </button>
              <span className="w-7 text-center font-semibold">{quantity}</span>
              <button
                aria-label="Increase quantity"
                disabled={quantity >= product.stock}
                onClick={() =>
                  dispatch({ type: "INCREASE_QTY", payload: product._id })
                }
                className="rounded-md border p-2 hover:bg-slate-50 disabled:opacity-40"
              >
                <Plus size={16} />
              </button>
              <button
                aria-label="Remove item"
                onClick={() =>
                  dispatch({ type: "REMOVE_ITEM", payload: product._id })
                }
                className="ml-2 rounded-md p-2 text-red-600 hover:bg-red-50"
              >
                <Trash2 size={17} />
              </button>
            </div>
          </article>
        ))}
      </div>

      <aside className="h-fit rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Order summary</h2>
        <div className="mt-4 flex justify-between border-t pt-4 text-slate-600">
          <span>Total</span>
          <strong className="text-xl text-slate-900">
            ₹{totalPrice.toLocaleString("en-IN")}
          </strong>
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Checkout is not included in this assignment.
        </p>
      </aside>
    </div>
  );
};

export default Cart;
