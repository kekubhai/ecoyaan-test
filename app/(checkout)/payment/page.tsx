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
        <div className="text-center bg-card p-8 rounded-2xl shadow-sm border border-border max-w-sm w-full transition-all duration-300">
          <p className="text-muted-foreground mb-6 transition-colors duration-300">Your session has expired or cart is empty.</p>
          <button
            onClick={() => router.push("/cart")}
            className="w-full bg-accent-green text-accent-green-foreground font-semibold py-3 rounded-xl hover:opacity-90 transition-all duration-300"
          >
            Return to Cart
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
      <div className="max-w-5xl mx-auto">
        <StepIndicator currentStep={3} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* LEFT PANEL: Order Summary with Items */}
          <div className="order-2 lg:order-1 space-y-6">
            <div className="bg-card p-6 rounded-2xl shadow-sm border border-border transition-all duration-300">
              <h2 className="text-lg font-semibold text-foreground mb-4 pb-4 border-b border-border transition-colors duration-300">Order Summary</h2>
              
              {/* Items List */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.product_id} className="flex gap-4">
                    <div className="w-16 h-16 flex-shrink-0 bg-muted rounded-lg overflow-hidden border border-border">
                      <img 
                        src={item.image} 
                        alt={item.product_name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate transition-colors duration-300">{item.product_name}</p>
                      <p className="text-xs text-muted-foreground mt-1 transition-colors duration-300">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-semibold text-foreground transition-colors duration-300">
                      ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between text-sm text-muted-foreground transition-colors duration-300">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground transition-colors duration-300">
                  <span>Shipping</span>
                  <span className="font-medium text-foreground">{shippingFee === 0 ? <span className="text-accent-green">Free</span> : `₹${shippingFee.toLocaleString("en-IN")}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-accent-green transition-colors duration-300">
                    <span>Discount</span>
                    <span className="font-medium">-₹{discount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-foreground pt-2 border-t border-dashed border-border mt-2 transition-colors duration-300">
                  <span>Total</span>
                  <span className="text-accent-green">₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Details & Payment */}
          <div className="order-1 lg:order-2 space-y-6">
            
            {/* Shipping Address Review */}
            <div className="bg-card p-6 rounded-2xl shadow-sm border border-border transition-all duration-300">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="bg-accent-green/15 p-1.5 rounded-full">
                    <MapPin className="w-4 h-4 text-accent-green" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground transition-colors duration-300">Delivery Address</h2>
                </div>
                <Link href="/shipping" className="text-xs font-medium text-accent-green hover:opacity-80 underline flex items-center gap-1 transition-all duration-300">
                  <Edit2 className="w-3 h-3" /> Edit
                </Link>
              </div>

              {shippingAddress ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground transition-colors duration-300">
                  <div className="sm:col-span-2 font-medium text-foreground mb-1">{shippingAddress.fullName}</div>
                  <div>{shippingAddress.email}</div>
                  <div>{shippingAddress.phone}</div>
                  <div className="sm:col-span-2 mt-2 pt-2 border-t border-border text-muted-foreground">
                    {shippingAddress.city}, {shippingAddress.state} - <span className="text-foreground font-medium">{shippingAddress.pinCode}</span>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg flex items-center gap-2 border border-amber-200 dark:border-amber-800 transition-colors duration-300">
                   Missing address details. 
                   <Link href="/shipping" className="underline font-semibold hover:text-amber-700 dark:hover:text-amber-300 transition-colors">Go back</Link>
                </div>
              )}
            </div>

            {/* Payment Button & Trust Badges */}
            <div className="bg-card p-6 rounded-2xl shadow-sm border border-border transition-all duration-300">
               <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2 transition-colors duration-300">
                  <div className="bg-accent-green/15 p-1.5 rounded-full">
                    <ShieldCheck className="w-4 h-4 text-accent-green" />
                  </div>
                  Payment Method
               </h2>
               
               <div className="mb-6 flex flex-wrap gap-2">
                  {[
                    { label: "UPI", icon: <CreditCard className="w-3 h-3" /> },
                    { label: "Cards", icon: <CreditCard className="w-3 h-3" /> },
                    { label: "Net Banking", icon: <Banknote className="w-3 h-3" /> }
                  ].map((method) => (
                    <span key={method.label} className="bg-muted border border-border text-muted-foreground px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 hover:bg-accent transition-all duration-300 cursor-default">
                      {method.label}
                    </span>
                  ))}
               </div>

               <button
                onClick={handlePayment}
                disabled={isProcessing || !shippingAddress}
                className="w-full bg-accent-green text-accent-green-foreground font-semibold py-4 rounded-xl shadow-lg hover:opacity-90 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    Pay Securely
                  </>
                )}
              </button>
              
              <div className="mt-4 flex flex-col items-center gap-2">
                <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full transition-colors duration-300">
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

