// src/addToCart/components/Payment/PaymentSummary.jsx
import React from "react";

const PaymentSummary = ({ totalAmount, paymentMethod }) => {
  return (
    <div className="mt-6 p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Payment Summary</h3>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-700 font-semibold">Payment Method:</span>
        <span className="text-lg text-gray-800">{paymentMethod}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-700 font-semibold">Total Amount:</span>
        <span className="text-lg font-bold text-gray-800">
          Rs. {totalAmount}
        </span>
      </div>
    </div>
  );
};

export default PaymentSummary;
