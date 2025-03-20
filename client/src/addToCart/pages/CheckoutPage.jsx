import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PaymentForm from "../components/Payment/PaymentForm";
import PaymentSummary from "../components/Payment/PaymentSummary";

const CheckoutPage = () => {
  const location = useLocation();
  const [paymentData, setPaymentData] = useState(null);
  const totalAmount = location.state?.totalAmount || 0;

  const handlePayment = (paymentDetails) => {
    setPaymentData(paymentDetails);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {paymentData ? (
        <PaymentSummary
          totalAmount={totalAmount}
          paymentMethod={paymentData.paymentMethod}
        />
      ) : (
        <PaymentForm
          totalAmount={totalAmount}
          onSubmitPayment={handlePayment}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
