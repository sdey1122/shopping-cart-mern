import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";

const App = () => (
  <BrowserRouter>
    <CartProvider>
      <CssBaseline />
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </CartProvider>
  </BrowserRouter>
);

export default App;
