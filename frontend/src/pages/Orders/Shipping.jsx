import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [errors, setErrors] = useState({}); // State for validation errors

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!address.trim()) errors.address = "Address is required";
    if (!city.trim()) errors.city = "City is required";
    if (!postalCode.trim()) errors.postalCode = "Postal code is required";
    if (!country.trim()) errors.country = "Country is required";

    // Example regex for postal code validation (basic validation for US)
    const postalCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;
    if (postalCode && !postalCodeRegex.test(postalCode)) {
      errors.postalCode = "Invalid postal code format";
    }

    return errors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // Only dispatch if no errors
      dispatch(saveShippingAddress({ address, city, postalCode, country }));
      dispatch(savePaymentMethod(paymentMethod));
      navigate("/placeorder");
    }
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="p-6">
      <ProgressSteps step1 step2 />
      <div className="mt-8 flex justify-center">
        <form onSubmit={submitHandler} className="max-w-md w-full">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">
            Shipping
          </h1>

          {/* Address Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && (
              <span className="text-red-500 text-sm">{errors.address}</span>
            )}
          </div>

          {/* City Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              placeholder="Enter city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
            {errors.city && (
              <span className="text-red-500 text-sm">{errors.city}</span>
            )}
          </div>

          {/* Postal Code Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Postal Code
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
            {errors.postalCode && (
              <span className="text-red-500 text-sm">{errors.postalCode}</span>
            )}
          </div>

          {/* Country Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
            {errors.country && (
              <span className="text-red-500 text-sm">{errors.country}</span>
            )}
          </div>

          {/* Payment Method Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Select Method
            </label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-indigo-600 focus:ring focus:ring-indigo-200"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-2 text-sm text-gray-600">
                  PayPal or Credit Card
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
