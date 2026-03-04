"use client";

import StepIndicator from "@/components/StepIndicator";
import ShippingForm from "@/components/ShippingForm";
import { useEffect, useState } from "react";

export default function ShippingPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
      <div className="max-w-3xl mx-auto">
        <StepIndicator currentStep={2} />

        <div className="space-y-6">
          <ShippingForm />
        </div>
      </div>
    </div>
  );
}


