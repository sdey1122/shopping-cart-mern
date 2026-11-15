import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import type { IProduct } from "../types/product";

const ProductCard = ({ product }: { product: IProduct }) => {
  const { state, dispatch } = useCart();

  const cartItem = state.items.find((item) => item.product._id === product._id);

  const remainingStock = product.stock - (cartItem?.quantity ?? 0);

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <img
        src={product.image}
        alt={product.name}
        className="h-52 w-full object-cover"
      />

      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
          {product.category}
        </p>

        <h3 className="mt-1 text-lg font-semibold text-slate-900">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm text-slate-500">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-slate-900">
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            <p className="text-xs text-slate-500">{remainingStock} in stock</p>
          </div>

          <button
            onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}
            disabled={remainingStock <= 0}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <ShoppingCart size={16} />
            {remainingStock <= 0 ? "Out of stock" : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
