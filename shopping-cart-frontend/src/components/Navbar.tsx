import { Link, NavLink } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <header className="bg-slate-900 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <ShoppingBag size={22} /> SimpleCart
        </Link>
        <div className="flex items-center gap-6">
          <NavLink to="/" className="text-sm text-slate-200 hover:text-white">
            Products
          </NavLink>
          <NavLink
            to="/cart"
            className="flex items-center gap-2 text-sm text-slate-200 hover:text-white"
          >
            Cart
            <span className="rounded-full bg-indigo-500 px-2 py-0.5 text-xs font-semibold text-white">
              {cartCount}
            </span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
