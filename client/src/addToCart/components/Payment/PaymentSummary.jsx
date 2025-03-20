import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";

const PaymentSummary = ({ totalAmount, paymentMethod }) => {
  return (
    <div className="mt-6 p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Payment Summary
      </h3>

      <div className="mb-6 flex items-center justify-between">
        <span className="text-gray-700 font-semibold text-lg">
          Payment Method:
        </span>
        <div className="flex items-center space-x-2">
          <FaMoneyBillWave className="text-xl text-green-500" />
          <span className="text-lg font-medium text-gray-800">
            {paymentMethod}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-green-100 rounded-lg">
        <span className="text-gray-700 font-semibold text-lg">
          Total Amount:
        </span>
        <span className="text-2xl font-bold text-green-700">
          Rs. {totalAmount}
        </span>
      </div>
    </div>
  );
};

export default PaymentSummary;
