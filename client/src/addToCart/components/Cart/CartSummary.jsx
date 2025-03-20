// src/addToCart/components/Cart/CartSummary.jsx
import React from "react";

const CartSummary = ({ totalAmount }) => {
  return (
    <div className="mt-4">
      <p className="font-bold text-xl">Total: ${totalAmount}</p>
    </div>
  );
};

export default CartSummary;
