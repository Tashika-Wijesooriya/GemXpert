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
    
      

      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
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
