"use client";

import { useCheckout } from "@/context/CheckoutContext";
import Link from "next/link";

export default function SuccessPage() {
  const { cartItems, shippingFee, shippingAddress } = useCheckout();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0
  );
  const grandTotal = subtotal + shippingFee;

  // Generate a mock order ID
  const orderId = `ECO${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Success Icon & Message */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Order Successful! 🎉
          </h1>
          <p className="text-gray-600">
            Thank you for your order. We&apos;ll send you a confirmation email
            shortly.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
            <span className="text-gray-600">Order ID</span>
            <span className="font-mono font-bold text-green-600">{orderId}</span>
          </div>

          {/* Shipping Address */}
          {shippingAddress && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                Shipping To
              </h3>
              <div className="text-gray-800">
                <p className="font-medium">{shippingAddress.fullName}</p>
                <p className="text-sm text-gray-600">
                  {shippingAddress.city}, {shippingAddress.state} -{" "}
                  {shippingAddress.pinCode}
                </p>
                <p className="text-sm text-gray-600">{shippingAddress.phone}</p>
              </div>
            </div>
          )}

          {/* Order Items */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
              Items Ordered
            </h3>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div
                  key={item.product_id}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-700">
                    {item.product_name} × {item.quantity}
                  </span>
                  <span className="text-gray-800 font-medium">
                    ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="border-t border-gray-100 pt-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span>
              <span>
                {shippingFee === 0
                  ? "Free"
                  : `₹${shippingFee.toLocaleString("en-IN")}`}
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-800 pt-2">
              <span>Total Paid</span>
              <span className="text-green-600">
                ₹{grandTotal.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <Link
          href="/cart"
          className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
