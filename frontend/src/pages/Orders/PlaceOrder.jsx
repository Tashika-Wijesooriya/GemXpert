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
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <ProgressSteps step1 step2 step3 />

      <div className="mt-8">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Image
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Product
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Quantity
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Price
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-4 py-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {item.qty}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      ${(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-5 text-gray-800">
            Order Summary
          </h2>
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <span className="font-semibold">Items:</span> ${cart.itemsPrice}
              </li>
              <li>
                <span className="font-semibold">Shipping:</span> $
                {cart.shippingPrice}
              </li>
              <li>
                <span className="font-semibold">Tax:</span> ${cart.taxPrice}
              </li>
              <li>
                <span className="font-semibold">Total:</span> ${cart.totalPrice}
              </li>
            </ul>

            {error && <Message variant="danger">{error.data.message}</Message>}

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Shipping Information
              </h3>
              <p className="text-sm text-gray-600">
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Payment Method
              </h3>
              <p className="text-sm text-gray-600">
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </button>

            {isLoading && <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
