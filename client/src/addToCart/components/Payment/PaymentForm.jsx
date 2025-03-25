import React, { useState } from "react";
import toast from "react-hot-toast";
import { CiCreditCard1 } from "react-icons/ci";
import {
  FaCcPaypal,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
} from "react-icons/fa6";

const PaymentForm = ({ totalAmount, onSubmitPayment }) => {
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [errors, setErrors] = useState({});

  const validateCreditCard = () => {
    const newErrors = {};
    let isValid = true;

    // Cardholder Name Validation
    if (!cardName.trim()) {
      newErrors.cardName = "Cardholder name is required";
      isValid = false;
    } else if (!/^[a-zA-Z ]+$/.test(cardName)) {
      newErrors.cardName = "Invalid name format";
      isValid = false;
    }

    // Card Number Validation
    const cleanedCardNumber = cardNumber.replace(/\s/g, "");
    if (!cleanedCardNumber) {
      newErrors.cardNumber = "Card number is required";
      isValid = false;
    } else if (!/^\d{13,19}$/.test(cleanedCardNumber)) {
      newErrors.cardNumber = "Invalid card number";
      isValid = false;
    }

    // Expiry Date Validation
    if (!expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
      isValid = false;
    } else {
      const [month, year] = expiryDate.split("/");
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        newErrors.expiryDate = "Invalid format (MM/YY)";
        isValid = false;
      } else if (
        parseInt(year) < currentYear ||
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        newErrors.expiryDate = "Card has expired";
        isValid = false;
      }
    }

    // CVV Validation
    if (!securityCode) {
      newErrors.securityCode = "CVV is required";
      isValid = false;
    } else if (!/^\d{3,4}$/.test(securityCode)) {
      newErrors.securityCode = "Invalid CVV";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim()
      .slice(0, 19);
  };

  const handleExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const getCardType = (number) => {
    const cleaned = number.replace(/\s/g, "");
    if (/^4/.test(cleaned)) return "visa";
    if (/^5[1-5]/.test(cleaned)) return "mastercard";
    if (/^3[47]/.test(cleaned)) return "amex";
    if (/^6(?:011|5)/.test(cleaned)) return "discover";
    return "unknown";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (paymentMethod === "Credit Card" && !validateCreditCard()) {
      toast.error("Please fix the validation errors");
      return;
    }

    onSubmitPayment({
      paymentMethod,
      cardNumber: cardNumber.replace(/\s/g, ""),
      cardName,
      expiryDate,
      securityCode,
    });
    toast.success("Payment successful!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Payment Total
      </h3>
      <p className="text-lg font-semibold text-gray-700 text-center">
        LKR Rs {totalAmount.toLocaleString("en-US")}
      </p>
      <br></br>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Select Payment Method
        </label>
        <div className="flex space-x-4">
          <button
            type="button"
            className={`p-4 border rounded-lg flex items-center space-x-2 w-1/2 justify-center transition-all duration-300 ${
              paymentMethod === "Credit Card"
                ? "border-green-500 bg-green-100"
                : "border-gray-300 bg-gray-100"
            }`}
            onClick={() => setPaymentMethod("Credit Card")}
          >
            <CiCreditCard1 className="text-2xl text-gray-700" />
            <span className="text-gray-700 font-medium">Credit Card</span>
          </button>
          <button
            type="button"
            className={`p-4 border rounded-lg flex items-center space-x-2 w-1/2 justify-center transition-all duration-300 ${
              paymentMethod === "PayPal"
                ? "border-green-500 bg-green-100"
                : "border-gray-300 bg-gray-100"
            }`}
            onClick={() => setPaymentMethod("PayPal")}
          >
            <FaCcPaypal className="text-2xl text-gray-700" />
            <span className="text-gray-700 font-medium">PayPal</span>
          </button>
        </div>
      </div>

      {paymentMethod === "Credit Card" && (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Choose Card Type
          </label>
          <div className="flex space-x-3">
            <FaCcVisa
              className={`text-3xl ${
                getCardType(cardNumber) === "visa"
                  ? "text-blue-600"
                  : "text-gray-400"
              }`}
            />
            <FaCcMastercard
              className={`text-3xl ${
                getCardType(cardNumber) === "mastercard"
                  ? "text-red-600"
                  : "text-gray-400"
              }`}
            />
            <FaCcAmex
              className={`text-3xl ${
                getCardType(cardNumber) === "amex"
                  ? "text-indigo-600"
                  : "text-gray-400"
              }`}
            />
            <FaCcDiscover
              className={`text-3xl ${
                getCardType(cardNumber) === "discover"
                  ? "text-orange-600"
                  : "text-gray-400"
              }`}
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className={`border p-3 w-full rounded-md focus:outline-none ${
                errors.cardName
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-green-500"
              }`}
              placeholder="Enter cardholder name"
            />
            {errors.cardName && (
              <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Card Number
            </label>
            <input
              type="text"
              value={formatCardNumber(cardNumber)}
              onChange={(e) => setCardNumber(e.target.value)}
              className={`border p-3 w-full rounded-md focus:outline-none ${
                errors.cardNumber
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-green-500"
              }`}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
            )}
          </div>

          <div className="mt-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) =>
                  setExpiryDate(handleExpiryDate(e.target.value))
                }
                className={`border p-3 w-full rounded-md focus:outline-none ${
                  errors.expiryDate
                    ? "border-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-green-500"
                }`}
                placeholder="MM/YY"
                maxLength={5}
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
              )}
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Security Code (CVV)
              </label>
              <input
                type="text"
                value={securityCode}
                onChange={(e) =>
                  setSecurityCode(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                className={`border p-3 w-full rounded-md focus:outline-none ${
                  errors.securityCode
                    ? "border-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-green-500"
                }`}
                placeholder="123"
                maxLength={4}
              />
              {errors.securityCode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.securityCode}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

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
