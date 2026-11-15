import ProductCard from "./ProductCard";
import type { IProduct } from "../types/product";

const ProductList = ({ products }: { products: IProduct[] }) => {
  if (products.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
        No products yet. Add a product below.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
