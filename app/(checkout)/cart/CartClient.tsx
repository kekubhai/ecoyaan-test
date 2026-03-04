"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import StepIndicator from "@/components/StepIndicator";
import type { CartApiResponse } from "@/types";

export default function CartClient({ initialData }: { initialData: CartApiResponse }) {
  const { 
    setCartItems, 
    setShippingFee, 
    setDiscount,
    cartItems, 
    shippingFee,
    discount 
  } = useCheckout();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Hydrate context with SSR data on first mount
  useEffect(() => {
    setCartItems(initialData.cartItems);
    setShippingFee(initialData.shipping_fee);
    setDiscount(initialData.discount_applied);
    setMounted(true);
  }, [initialData, setCartItems, setShippingFee, setDiscount]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0
  );
  
  const grandTotal = Math.max(0, subtotal + shippingFee - discount);
{`min-h-screen transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}
  return (
    <div className="min-h-screen">
      <div className="w-full">

        <StepIndicator currentStep={1} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 lg:hidden">Your Cart</h1>
            
            {cartItems.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl text-center border border-gray-100 shadow-sm">
                <p className="text-gray-500 mb-6">Your cart is empty.</p>
                <button
                  onClick={() => router.push('/')}
                  className="text-green-600 font-semibold hover:text-green-700"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <CartItem key={item.product_id} item={item} />
              ))
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-6">
            <OrderSummary
              subtotal={subtotal}
              shippingFee={shippingFee}
              discount={discount}
              grandTotal={grandTotal}
            />

            <button
              onClick={() => router.push("/shipping")}
              disabled={cartItems.length === 0}
              className="w-full group bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-green-100 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
            
            <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Secure Checkout
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
