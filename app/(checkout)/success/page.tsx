"use client";

import { useEffect, useState } from "react";
import { useCheckout } from "@/context/CheckoutContext";
import Link from "next/link";
import { Check, ShoppingBag, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  const { cartItems, shippingFee, discount } = useCheckout();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0
  );
  const grandTotal = Math.max(0, subtotal + shippingFee - discount);

  // Generate a mock order ID
  const orderId = `ECO${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className={`min-h-[80vh] flex flex-col items-center justify-center transition-opacity duration-700 ${isMounted ? "opacity-100" : "opacity-0"}`}>
      <div className="max-w-md w-full px-4 py-12 flex flex-col items-center">
        
        {/* Animated Checkmark */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-green-200 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
          <div className="relative w-24 h-24 bg-green-50 border-4 border-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-100 animate-bounce-slow">
            <Check className="w-12 h-12 text-green-600" strokeWidth={3} />
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-500 font-medium">
            Thank you for shopping sustainably with Ecoyaan 🌱
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-600"></div>
          
          <div className="flex justify-between items-center pb-4 border-b border-gray-50 mb-4">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Order ID</span>
            <span className="font-mono font-bold text-gray-800 bg-gray-50 px-2 py-1 rounded text-sm">{orderId}</span>
          </div>

          <div className="space-y-3 mb-6">
            {cartItems.map((item) => (
              <div key={item.product_id} className="flex justify-between text-sm">
                <span className="text-gray-600 truncate max-w-[200px]">
                  {item.product_name} <span className="text-gray-400">× {item.quantity}</span>
                </span>
                <span className="text-gray-800 font-medium">
                  ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-2">
             <div className="flex justify-between text-sm text-gray-500">
               <span>Subtotal</span>
               <span>₹{subtotal.toLocaleString("en-IN")}</span>
             </div>
             {discount > 0 && (
               <div className="flex justify-between text-sm text-green-600">
                 <span>Discount</span>
                 <span>-₹{discount.toLocaleString("en-IN")}</span>
               </div>
             )}
             <div className="flex justify-between text-lg font-bold text-gray-800 pt-2">
               <span>Total Paid</span>
               <span className="text-green-600">₹{grandTotal.toLocaleString("en-IN")}</span>
             </div>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full space-y-4">
          <Link
            href="/cart"
            className="w-full flex items-center justify-center gap-2 border-2 border-green-600 text-green-700 hover:bg-green-50 rounded-xl py-3.5 font-semibold transition-all duration-200 active:scale-95 group"
          >
            <ShoppingBag className="w-4 h-4" />
            Continue Shopping
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          {/* Eco Tip */}
          <div className="bg-green-50 p-4 rounded-xl text-center">
            <p className="text-xs text-green-800 italic leading-relaxed">
              <span className="not-italic mr-1">🌿</span> 
              Did you know? Bamboo toothbrushes save ~1 billion plastic brushes from landfills yearly.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
