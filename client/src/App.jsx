import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartPage from "./addToCart/pages/CartPage";
import CheckoutPage from "./addToCart/pages/CheckoutPage";
import "./index.css";
import toast, { Toaster } from "react-hot-toast";


function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
