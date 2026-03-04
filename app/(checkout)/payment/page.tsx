"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import StepIndicator from "@/components/StepIndicator";
import OrderSummary from "@/components/OrderSummary";

export default function PaymentPage() {
  const router = useRouter();
  const { cartItems, shippingFee, shippingAddress } = useCheckout();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0
  );
  const grandTotal = subtotal + shippingFee;

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/success");
  };

  // Redirect to cart if no items
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <button
            onClick={() => router.push("/cart")}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Go to Cart →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <StepIndicator currentStep={3} />

        <h1 className="text-2xl font-bold text-gray-800 mb-6">Payment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Shipping Address Summary */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Shipping Address
            </h2>
            {shippingAddress ? (
              <div className="space-y-2 text-gray-600">
                <p className="font-medium text-gray-800">
                  {shippingAddress.fullName}
                </p>
                <p>{shippingAddress.email}</p>
                <p>{shippingAddress.phone}</p>
                <p>
                  {shippingAddress.city}, {shippingAddress.state} -{" "}
                  {shippingAddress.pinCode}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">No address provided.</p>
            )}
          </div>

          {/* Order Items */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Order Items
            </h2>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item.product_id}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 truncate">{item.product_name}</p>
                    <p className="text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-gray-800 font-medium ml-4">
                    ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-6">
          <OrderSummary
            subtotal={subtotal}
            shippingFee={shippingFee}
            grandTotal={grandTotal}
          />
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          disabled={isProcessing || !shippingAddress}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Processing Payment...
            </>
          ) : (
            "🔒 Pay Securely"
          )}
        </button>
      </div>
    </div>
  );
}
