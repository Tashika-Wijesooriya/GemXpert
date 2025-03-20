// src/addToCart/components/Payment/PaymentForm.jsx
import React, { useState } from "react";
import toast from "react-hot-toast";

const PaymentForm = ({ totalAmount, onSubmitPayment }) => {
  const [paymentMethod, setPaymentMethod] = useState("Credit/Debit Card");
  const [cardNumber, setCardNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === "Credit/Debit Card" && cardNumber.trim() === "") {
      toast.error("Please enter your card number.");
      return;
    }

    onSubmitPayment({ paymentMethod, cardNumber });
    toast.success("Payment successful!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Payment Details
      </h3>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700">
          Payment Method
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="Credit/Debit Card">Credit/Debit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Online Banking">Online Banking</option>
        </select>
      </div>

      {paymentMethod === "Credit/Debit Card" && (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700">
            Card Number
          </label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your card number"
          />
        </div>
      )}

      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-700 font-semibold">Total:</p>
        <p className="text-lg font-bold text-gray-800">Rs. {totalAmount}</p>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 transition-all duration-300"
      >
        Confirm Payment
      </button>
    </form>
  );
};

export default PaymentForm;
