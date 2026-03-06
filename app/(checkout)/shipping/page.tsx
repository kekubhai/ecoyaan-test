"use client";

import StepIndicator from "@/components/StepIndicator";
import ShippingForm from "@/components/ShippingForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ShippingPage() {
  const router = useRouter();
  const { shippingAddresses } = useCheckout();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const canProceed = shippingAddresses.length > 0;

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
      <div className="max-w-3xl mx-auto pb-28">
        <StepIndicator currentStep={2} />

        <div className="space-y-6">
          <ShippingForm />
        </div>
      </div>

      {/* Sticky bottom action bar: Back + Next Step together */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)] transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <Link
            href="/cart"
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-input bg-background font-semibold text-foreground hover:bg-accent transition-all duration-300 order-2 sm:order-1"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
          <button
            type="button"
            onClick={() => canProceed && router.push("/payment")}
            disabled={!canProceed}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent-green text-accent-green-foreground font-semibold shadow-lg hover:opacity-90 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex-1 sm:flex-initial order-1 sm:order-2"
          >
            Next Step
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
