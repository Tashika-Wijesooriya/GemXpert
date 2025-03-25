import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    setCartItems([
      {
        id: 1,
        name: "2.28ct Natural Blue Sapphire",
        imageUrl: "/gem1.jpg",
        quantity: 1,
        price: 1355900,
      },
      {
        id: 2,
        name: "0.55ct Natural Unheated Ruby",
        imageUrl: "/gem2.jpg",
        quantity: 1,
        price: 314500,
      },
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your cart</h1>
          <Link
            to="/"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Continue shopping
          </Link>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="hidden sm:grid grid-cols-12 bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div className="col-span-5 text-sm font-medium text-gray-500">
              PRODUCT
            </div>
            <div className="col-span-2 text-sm font-medium text-gray-500">
              PRICE
            </div>
            <div className="col-span-3 text-sm font-medium text-gray-500">
              QUANTITY
            </div>
            <div className="col-span-2 text-sm font-medium text-gray-500">
              TOTAL
            </div>
          </div>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-4 px-4 py-6 border-b border-gray-200"
            >
              <div className="col-span-12 sm:col-span-5 flex items-center">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.name}
                  </h3>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="mt-2 text-red-600 hover:text-red-500 flex items-center"
                  >
                    <FaTrashAlt className="w-4 h-4 mr-1" />
                    <span className="text-sm">Remove</span>
                  </button>
                </div>
              </div>

              <div className="col-span-12 sm:col-span-2 flex items-center">
                <p className="text-gray-900">
                  Rs{" "}
                  {item.price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="col-span-12 sm:col-span-3 flex items-center">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                    className="px-3 py-1 text-gray-600 hover:text-gray-900"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(item.id, +e.target.value)
                    }
                    className="w-12 text-center border-0 focus:ring-0"
                    min="1"
                  />
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                    className="px-3 py-1 text-gray-600 hover:text-gray-900"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="col-span-12 sm:col-span-2 flex items-center">
                <p className="text-gray-900 font-medium">
                  Rs{" "}
                  {(item.price * item.quantity).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          ))}

         

          <div className="px-4 py-6">
            <div className="flex justify-end">
              <div className="w-full max-w-xs">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-3">
                  <span>Subtotal</span>
                  <span>
                    Rs{" "}
                    {totalAmount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}{" "}
                    LKR
                  </span>
                </div>
                
                <Link
                  to="/checkout"
                  state={{ totalAmount }}
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md shadow-sm hover:bg-indigo-700 flex items-center justify-center text-base font-medium"
                >
                  CHECK OUT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
