import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPaPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPaPal && paypal.clientId) {
      const loadingPaPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: { "client-id": paypal.clientId, currency: "USD" },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid && !window.paypal) {
        loadingPaPalScript();
      }
    }
  }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({ purchase_units: [{ amount: { value: order.totalPrice } }] })
      .then((orderID) => orderID);
  };

  const onError = (err) => {
    toast.error(err.message);
  };

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error.data.message}</Message>;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-[#1A1A1A]">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#2D2D2D] shadow-xl rounded-xl p-6 space-y-8 border border-pink-600/20">
          {/* Cart Details */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-300">
              Order Details
            </h2>
            {order.orderItems.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="border-b-2 border-pink-600/20">
                    <tr className="bg-pink-600/10">
                      <th className="p-3 text-left text-sm text-gray-300 font-semibold">
                        Image
                      </th>
                      <th className="p-3 text-left text-sm text-gray-300 font-semibold">
                        Product
                      </th>
                      <th className="p-3 text-center text-sm text-gray-300 font-semibold">
                        Quantity
                      </th>
                      <th className="p-3 text-left text-sm text-gray-300 font-semibold">
                        Unit Price
                      </th>
                      <th className="p-3 text-left text-sm text-gray-300 font-semibold">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderItems.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-pink-600/5 transition-colors border-b border-pink-600/20 last:border-0"
                      >
                        <td className="p-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md border border-gray-600"
                          />
                        </td>
                        <td className="p-3">
                          <Link
                            to={`/product/${item.product}`}
                            className="text-pink-500 hover:text-pink-400 transition-colors"
                          >
                            {item.name}
                          </Link>
                        </td>
                        <td className="p-3 text-center text-gray-400">
                          {item.qty}
                        </td>
                        <td className="p-3 text-gray-400">
                          {item.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </td>
                        <td className="p-3 text-gray-300 font-semibold">
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
          </div>

          {/* Payment Summary */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-300">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-400">
                <span>Items</span>
                <span>
                  {order.itemsPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span>
                  {order.shippingPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Tax</span>
                <span>
                  {order.taxPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </div>
              <div className="flex justify-between text-gray-300 font-semibold pt-4 border-t border-pink-600/20">
                <span>Total</span>
                <span>
                  {order.totalPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </div>

              {!order.isPaid && (
                <div className="pt-6">
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div className="bg-[#1A1A1A] p-4 rounded-xl">
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                        style={{
                          color: "gold",
                          layout: "horizontal",
                          height: 48,
                          tagline: false,
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <div className="pt-6">
                    <button
                      type="button"
                      className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
