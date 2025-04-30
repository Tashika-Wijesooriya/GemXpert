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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
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
              key={item._id}
              className="grid grid-cols-12 gap-4 px-4 py-6 border-b border-gray-200"
            >
              <div className="col-span-12 sm:col-span-5 flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.name}
                  </h3>
                  <button
                    onClick={() => removeFromCartHandler(item._id)}
                    className="mt-2 text-red-600 hover:text-red-500 flex items-center"
                  >
                    <FaTrashAlt className="w-4 h-4 mr-1" />
                    <span className="text-sm">Remove</span>
                  </button>
                </div>
              </div>

              <div className="col-span-12 sm:col-span-2 flex items-center">
                <p className="text-gray-900">
                  ${" "}
                  {item.price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="col-span-12 sm:col-span-3 flex items-center">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => handleUpdateQuantity(item._id, item.qty - 1)}
                    className="px-3 py-1 text-gray-600 hover:text-gray-900"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) =>
                      handleUpdateQuantity(item._id, +e.target.value)
                    }
                    className="w-12 text-center border-0 focus:ring-0"
                    min="1"
                  />
                  <button
                    onClick={() => handleUpdateQuantity(item._id, item.qty + 1)}
                    className="px-3 py-1 text-gray-600 hover:text-gray-900"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="col-span-12 sm:col-span-2 flex items-center">
                <p className="text-gray-900 font-medium">
                  ${" "}
                  {(item.price * item.qty).toLocaleString("en-US", {
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
                    ${" "}
                    {totalAmount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}{" "}
                  </span>
                </div>
                {/* Use button for checkout instead of Link */}
                <button
                  onClick={checkoutHandler}
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md shadow-sm hover:bg-indigo-700 flex items-center justify-center text-base font-medium"
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
