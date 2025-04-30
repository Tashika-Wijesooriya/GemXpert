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
    <div className="container mx-auto px-4 py-8 min-h-screen bg-[#1A1A1A]">
      <div className="max-w-md mx-auto">
        <ProgressSteps step1 step2 className="text-pink-500" />

        <div className="mt-8 bg-[#2D2D2D] p-6 rounded-xl shadow-xl border border-pink-600/20">
          <form onSubmit={submitHandler} className="space-y-6">
            <h1 className="text-2xl font-bold mb-4 text-gray-300">
              Shipping Details
            </h1>

            {/* Address Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">
                Address
              </label>
              <input
                type="text"
                className="w-full p-3 bg-[#1A1A1A] border-2 border-pink-600 rounded-lg focus:border-pink-500 focus:ring-0 text-gray-300 placeholder-gray-500"
                placeholder="Enter street address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
              {errors.address && (
                <span className="text-red-400 text-sm">{errors.address}</span>
              )}
            </div>

            {/* City Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">
                City
              </label>
              <input
                type="text"
                className="w-full p-3 bg-[#1A1A1A] border-2 border-pink-600 rounded-lg focus:border-pink-500 focus:ring-0 text-gray-300 placeholder-gray-500"
                placeholder="Enter city"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
              {errors.city && (
                <span className="text-red-400 text-sm">{errors.city}</span>
              )}
            </div>

            {/* Postal Code Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">
                Postal Code
              </label>
              <input
                type="text"
                className="w-full p-3 bg-[#1A1A1A] border-2 border-pink-600 rounded-lg focus:border-pink-500 focus:ring-0 text-gray-300 placeholder-gray-500"
                placeholder="Enter postal code"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              />
              {errors.postalCode && (
                <span className="text-red-400 text-sm">
                  {errors.postalCode}
                </span>
              )}
            </div>

            {/* Country Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">
                Country
              </label>
              <input
                type="text"
                className="w-full p-3 bg-[#1A1A1A] border-2 border-pink-600 rounded-lg focus:border-pink-500 focus:ring-0 text-gray-300 placeholder-gray-500"
                placeholder="Enter country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              />
              {errors.country && (
                <span className="text-red-400 text-sm">{errors.country}</span>
              )}
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-400">
                Payment Method
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-pink-600 focus:ring-pink-500 border-2 border-pink-600"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-3 text-gray-300 text-sm">
                  PayPal or Credit Card
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200"
              type="submit"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
