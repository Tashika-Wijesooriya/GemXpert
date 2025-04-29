import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    // Navigate to login page with a redirect to /shipping after login
    navigate("/login?redirect=/shipping");
  };

  const handleUpdateQuantity = (id, qty) => {
    if (qty > 0) {
      const item = cartItems.find((item) => item._id === id);
      dispatch(addToCart({ ...item, qty }));
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-300">Your Cart</h1>
          <Link
            to="/"
            className="text-pink-500 hover:text-pink-400 font-medium transition-colors duration-200"
          >
            Continue shopping
          </Link>
        </div>

        <div className="bg-[#2D2D2D] shadow-xl rounded-xl border border-pink-600/20">
          <div className="hidden sm:grid grid-cols-12 bg-pink-600/10 px-6 py-4 border-b border-pink-600/20">
            {["PRODUCT", "PRICE", "QUANTITY", "TOTAL"].map((header) => (
              <div
                key={header}
                className="col-span-3 text-sm font-medium text-gray-300 uppercase"
              >
                {header}
              </div>
            ))}
          </div>

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-12 gap-4 px-6 py-6 border-b border-pink-600/20 hover:bg-pink-600/5 transition-colors"
            >
              <div className="col-span-12 sm:col-span-5 flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-600"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-300">
                    {item.name}
                  </h3>
                  <button
                    onClick={() => removeFromCartHandler(item._id)}
                    className="mt-2 text-red-500 hover:text-red-400 flex items-center transition-colors duration-200"
                  >
                    <FaTrashAlt className="w-4 h-4 mr-1" />
                    <span className="text-sm">Remove</span>
                  </button>
                </div>
              </div>

              <div className="col-span-12 sm:col-span-2 flex items-center">
                <p className="text-gray-400">
                  {item.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>

              <div className="col-span-12 sm:col-span-3 flex items-center">
                <div className="flex items-center border border-pink-600 rounded-md bg-[#1A1A1A]">
                  <button
                    onClick={() => handleUpdateQuantity(item._id, item.qty - 1)}
                    className="px-3 py-1 text-pink-500 hover:text-pink-400 transition-colors duration-200"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) =>
                      handleUpdateQuantity(item._id, +e.target.value)
                    }
                    className="w-12 text-center border-0 bg-transparent text-gray-300 focus:ring-0"
                    min="1"
                  />
                  <button
                    onClick={() => handleUpdateQuantity(item._id, item.qty + 1)}
                    className="px-3 py-1 text-pink-500 hover:text-pink-400 transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="col-span-12 sm:col-span-2 flex items-center">
                <p className="text-gray-300 font-semibold">
                  {(item.price * item.qty).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
            </div>
          ))}

          <div className="px-6 py-6">
            <div className="flex justify-end">
              <div className="w-full max-w-xs">
                <div className="flex justify-between text-base font-medium text-gray-300 mb-4 pb-4 border-b border-pink-600/20">
                  <span>Subtotal</span>
                  <span>
                    {totalAmount.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>
                <button
                  onClick={checkoutHandler}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200 flex items-center justify-center"
                >
                  CHECK OUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
