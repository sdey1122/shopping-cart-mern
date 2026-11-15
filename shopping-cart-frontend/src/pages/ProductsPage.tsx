import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import { getProducts } from "../services/product.service";
import type { IProduct } from "../types/product";

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      setError("");
      const data = await getProducts();
      setProducts(data);
    } catch {
      setError("Could not load products. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProducts();
  }, []);

  const handleCreated = (product: IProduct) => {
    setProducts((current) => [product, ...current]);
  };

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-7">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
          Simple shopping cart
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Explore products
        </h1>
        <p className="mt-2 text-slate-500">
          Add products to your cart and manage quantities.
        </p>
      </div>
      {loading ? (
        <p className="py-10 text-slate-500">Loading products...</p>
      ) : null}
      {error && (
        <p className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}
      {!loading && !error && <ProductList products={products} />}
      <ProductForm onCreated={handleCreated} />
    </main>
  );
};

export default ProductsPage;
