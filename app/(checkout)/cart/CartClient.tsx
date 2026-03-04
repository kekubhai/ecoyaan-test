"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import StepIndicator from "@/components/StepIndicator";

type CartData = {
  cartItems: {
    product_id: number;
    product_name: string;
    product_price: number;
    quantity: number;
    image: string;
  }[];
  shipping_fee: number;
  discount_applied: number;
};

export default function CartClient({ initialData }: { initialData: CartData }) {
  const { setCartItems, setShippingFee, cartItems, shippingFee } = useCheckout();
  const router = useRouter();

  // Hydrate context with SSR data on first mount
  useEffect(() => {
    setCartItems(initialData.cartItems);
    setShippingFee(initialData.shipping_fee);
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0
  );
  const grandTotal = subtotal + shippingFee - initialData.discount_applied;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">

        <StepIndicator currentStep={1} />

        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <CartItem key={item.product_id} item={item} />
              ))
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              shippingFee={shippingFee}
              discount={initialData.discount_applied}
              grandTotal={grandTotal}
            />

            <button
              onClick={() => router.push("/shipping")}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
            >
              Proceed to Checkout →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}