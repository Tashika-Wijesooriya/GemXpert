import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetOrdersQuery,
  useDeleteOrderMutation,
} from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import { FaEye, FaTrash } from "react-icons/fa";
import DownloadReportButton from "../../components/DownloadReportButton"; // Importing the download report button

const OrderList = () => {
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();

  const [searchUser, setSearchUser] = useState("");
  const [searchOrderId, setSearchOrderId] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(id).unwrap();
        refetch();
        toast.success("Order deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const filteredOrders =
    orders?.filter((order) => {
      const userMatch =
        !searchUser ||
        order.user?.username.toLowerCase().includes(searchUser.toLowerCase());
      const orderIdMatch =
        !searchOrderId ||
        order._id.toLowerCase().includes(searchOrderId.toLowerCase());
      const dateMatch = !searchDate || order.createdAt?.startsWith(searchDate);
      return userMatch && orderIdMatch && dateMatch;
    }) || [];

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">
        <AdminMenu />

        {/* Filters Section */}
        <div className="mb-8 bg-[#2D2D2D] p-6 rounded-xl shadow-lg border border-pink-600/20">
          <h2 className="text-2xl font-bold text-gray-200 mb-6">
            Order Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search by User..."
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              className="w-full p-3 bg-[#1A1A1A] border-2 border-pink-600 rounded-lg focus:border-pink-500 focus:ring-0 text-gray-300"
            />
            <input
              type="text"
              placeholder="Search by Order ID..."
              value={searchOrderId}
              onChange={(e) => setSearchOrderId(e.target.value)}
              className="w-full p-3 bg-[#1A1A1A] border-2 border-pink-600 rounded-lg focus:border-pink-500 focus:ring-0 text-gray-300"
            />
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="w-full p-3 bg-[#1A1A1A] border-2 border-pink-600 rounded-lg focus:border-pink-500 focus:ring-0 text-gray-300"
            />
          </div>
        </div>

        {/* Order List */}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <div className="bg-[#2D2D2D] rounded-xl shadow-lg overflow-hidden border border-pink-600/20">
            <div className="p-6 border-b border-pink-600/20">
              <h3 className="text-xl font-semibold text-gray-200">
                {filteredOrders.length} Orders Found
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-pink-600/10">
                  <tr>
                    {[
                      "Product",
                      "Order ID",
                      "User",
                      "Date",
                      "Total",
                      "Status",
                      "Actions",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-pink-600/20">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr
                        key={order._id}
                        className="hover:bg-pink-600/5 transition-colors"
                      >
                        {/* Product Column */}
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img
                              src={
                                order.orderItems[0]?.image ||
                                "/images/default-product.png"
                              }
                              alt="Product"
                              className="w-12 h-12 rounded-md object-cover border border-gray-600"
                            />
                          </div>
                        </td>

                        {/* Order ID */}
                        <td className="px-6 py-4 text-sm font-medium text-gray-300">
                          <span className="cursor-help" title={order._id}>
                            #{order._id.slice(-8).toUpperCase()}
                          </span>
                        </td>

                        {/* User */}
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {order.user?.username || "Guest"}
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>

                        {/* Total */}
                        <td className="px-6 py-4 text-sm font-semibold text-gray-300">
                          {order.totalPrice.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 text-center">
                          <div className="flex flex-col gap-1">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                order.isPaid
                                  ? "bg-green-100 text-green-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              Payment: {order.isPaid ? "Completed" : "Pending"}
                            </span>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                order.isDelivered
                                  ? "bg-green-100 text-green-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              Delivery:{" "}
                              {order.isDelivered ? "Completed" : "Pending"}
                            </span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-sm font-medium">
                          <div className="flex justify-center items-center space-x-4">
                            <Link
                              to={`/order/${order._id}`}
                              className="text-pink-500 hover:text-pink-400 transition-colors duration-200"
                              title="View Details"
                            >
                              <FaEye className="w-5 h-5" />
                            </Link>
                            <button
                              onClick={() => handleDelete(order._id)}
                              className="text-red-500 hover:text-red-400 transition-colors duration-200"
                              title="Delete"
                            >
                              <FaTrash className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-4 text-center text-sm text-gray-400"
                      >
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Download Report Button */}
        <div className="mt-8 flex justify-end">
          <DownloadReportButton orders={filteredOrders} />
        </div>
      </div>
    </div>
  );
};

export default OrderList;
