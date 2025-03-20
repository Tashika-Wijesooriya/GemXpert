// src/addToCart/components/Cart/CartActions.jsx
import React from "react";

const CartActions = ({ onRemove, onUpdateQuantity, item }) => {
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        className="px-2 py-1 bg-blue-500 text-white rounded-lg"
      >
        +
      </button>

      {/* Display the current quantity */}
      <span className="px-4 py-1 bg-gray-100 rounded-lg">{item.quantity}</span>

      <button
        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
        className="px-2 py-1 bg-blue-500 text-white rounded-lg"
      >
        -
      </button>

      <button
        onClick={() => onRemove(item.id)}
        className="px-4 py-2 bg-red-500 text-white rounded-lg"
      >
        Remove
      </button>
    </div>
  );
};

export default CartActions;
