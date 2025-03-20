// src/addToCart/components/Cart/CartItem.jsx
import React from "react";
import CartActions from "./CartActions";

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center space-x-4">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-md"
        />
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-gray-800">{item.name}</p>

          {/* Added price for each product with styling */}
          <p className="text-sm text-gray-600">Rs. {item.price}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <CartActions
          item={item}
          onRemove={onRemove}
          onUpdateQuantity={onUpdateQuantity}
        />
      </div>
    </div>
  );
};

export default CartItem;
