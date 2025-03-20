import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/Cart/CartItem";
import CartSummary from "../components/Cart/CartSummary";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from API or local storage
    setCartItems([
      { id: 1, name: "Gem 1", imageUrl: "/gem1.jpg", quantity: 1, price: 50 },
      { id: 2, name: "Gem 2", imageUrl: "/gem2.jpg", quantity: 2, price: 30 },
      { id: 3, name: "Gem 2", imageUrl: "/gem3.jpg", quantity: 2, price: 30 },
    ]);
  }, []);

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.success("Item removed from the cart");
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) newQuantity = 1;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    toast.success("Cart updated");
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-indigo-200 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden p-8 border border-gray-300">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Your Cart
        </h2>
        <div className="space-y-6">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={handleRemoveItem}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ))}
        </div>
        <div className="mt-6">
          <CartSummary totalAmount={totalAmount} />
        </div>
        <div className="flex space-x-4 mt-6">
          <Link
            to="/checkout"
            state={{ totalAmount }}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md"
          >
            Proceed to Checkout
          </Link>
          <Link
            to="/"
            className="w-full bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition duration-300 shadow-md"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
