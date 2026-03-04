"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import StepIndicator from "@/components/StepIndicator";
import { MapPin, ShieldCheck, Lock, Loader2, Edit2, CreditCard, Banknote } from "lucide-react";
import Link from "next/link";

export default function PaymentPage() {
  const router = useRouter();
  const { cartItems, shippingFee, shippingAddress, discount } = useCheckout();
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0
  );
  const grandTotal = Math.max(0, subtotal + shippingFee - discount);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/success");
  };

  // Redirect to cart if no items
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-sm w-full">
          <p className="text-gray-500 mb-6">Your session has expired or cart is empty.</p>
          <button
            onClick={() => router.push("/cart")}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all"
          >
            Return to Cart
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto">
        <StepIndicator currentStep={3} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* LEFT PANEL: Order Summary with Items */}
          <div className="order-2 lg:order-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-4 border-b border-gray-100">Order Summary</h2>
              
              {/* Items List */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.product_id} className="flex gap-4">
                    <div className="w-16 h-16 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                      <img 
                        src={item.image} 
                        alt={item.product_name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{item.product_name}</p>
                      <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-semibold text-gray-800">
                      ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">{shippingFee === 0 ? <span className="text-green-600">Free</span> : `₹${shippingFee.toLocaleString("en-IN")}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">-₹{discount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t border-dashed border-gray-200 mt-2">
                  <span>Total</span>
                  <span className="text-green-600">₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Details & Payment */}
          <div className="order-1 lg:order-2 space-y-6">
            
            {/* Shipping Address Review */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="bg-green-50 p-1.5 rounded-full">
                    <MapPin className="w-4 h-4 text-green-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Delivery Address</h2>
                </div>
                <Link href="/shipping" className="text-xs font-medium text-green-600 hover:text-green-700 underline flex items-center gap-1 transition-colors">
                  <Edit2 className="w-3 h-3" /> Edit
                </Link>
              </div>

              {shippingAddress ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                  <div className="sm:col-span-2 font-medium text-gray-800 mb-1">{shippingAddress.fullName}</div>
                  <div>{shippingAddress.email}</div>
                  <div>{shippingAddress.phone}</div>
                  <div className="sm:col-span-2 mt-2 pt-2 border-t border-gray-50 text-gray-500">
                    {shippingAddress.city}, {shippingAddress.state} - <span className="text-gray-800 font-medium">{shippingAddress.pinCode}</span>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg flex items-center gap-2 border border-amber-100">
                   Missing address details. 
                   <Link href="/shipping" className="underline font-semibold hover:text-amber-700">Go back</Link>
                </div>
              )}
            </div>

            {/* Payment Button & Trust Badges */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
               <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <div className="bg-green-50 p-1.5 rounded-full">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                  </div>
                  Payment Method
               </h2>
               
               <div className="mb-6 flex flex-wrap gap-2">
                  {[
                    { label: "UPI", icon: <CreditCard className="w-3 h-3" /> },
                    { label: "Cards", icon: <CreditCard className="w-3 h-3" /> },
                    { label: "Net Banking", icon: <Banknote className="w-3 h-3" /> }
                  ].map((method) => (
                    <span key={method.label} className="bg-gray-50 border border-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 hover:bg-gray-100 transition-colors cursor-default">
                      {method.label}
                    </span>
                  ))}
               </div>

               <button
                onClick={handlePayment}
                disabled={isProcessing || !shippingAddress}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-4 rounded-xl shadow-lg shadow-green-100 transition-all duration-200 active:scale-95 disabled:cursor-not-allowed flex items-center justify-center gap-2 group relative overflow-hidden disabled:shadow-none"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Pay Securely
                  </>
                )}
              </button>
              
              <div className="mt-4 flex flex-col items-center gap-2">
                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full">
                   <Lock className="w-3 h-3" />
                   <span>256-bit SSL Secured Connection</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

