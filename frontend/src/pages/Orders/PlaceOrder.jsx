import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-[#1A1A1A]">
      <div className="max-w-4xl mx-auto">
        <ProgressSteps step1 step2 step3 className="text-pink-500" />

        <div className="mt-8">
          {cart.cartItems.length === 0 ? (
            <Message>Your cart is empty</Message>
          ) : (
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-[#2D2D2D] rounded-xl shadow-xl border border-pink-600/20">
                <thead className="bg-pink-600/10">
                  <tr>
                    {["Image", "Product", "Quantity", "Price", "Total"].map(
                      (header) => (
                        <th
                          key={header}
                          className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase"
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-pink-600/20">
                  {cart.cartItems.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-pink-600/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md border border-gray-600"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/product/${item.product}`}
                          className="text-pink-500 hover:text-pink-400 transition-colors"
                        >
                          {item.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{item.qty}</td>
                      <td className="px-6 py-4 text-gray-400">
                        {item.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </td>
                      <td className="px-6 py-4 text-gray-300 font-semibold">
                        {(item.qty * item.price).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-300">
              Order Summary
            </h2>
            <div className="p-6 bg-[#2D2D2D] rounded-xl shadow-xl border border-pink-600/20">
              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Items:</span>
                  <span>
                    {cart.itemsPrice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping:</span>
                  <span>
                    {cart.shippingPrice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax:</span>
                  <span>
                    {cart.taxPrice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-gray-300 font-semibold pt-4 border-t border-pink-600/20">
                  <span>Total:</span>
                  <span>
                    {cart.totalPrice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>
              </div>

              {error && (
                <Message variant="danger" className="mt-4">
                  {error.data.message}
                </Message>
              )}

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">
                  Shipping Information
                </h3>
                <p className="text-sm text-gray-400">
                  {cart.shippingAddress.address}, {cart.shippingAddress.city}
                  <br />
                  {cart.shippingAddress.postalCode},{" "}
                  {cart.shippingAddress.country}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">
                  Payment Method
                </h3>
                <p className="text-sm text-gray-400 uppercase">
                  {cart.paymentMethod}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </button>

              {isLoading && <Loader className="mt-4" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
