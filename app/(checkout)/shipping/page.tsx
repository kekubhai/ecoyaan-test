"use client";

import StepIndicator from "@/components/StepIndicator";
import ShippingForm from "@/components/ShippingForm";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <StepIndicator currentStep={2} />

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Shipping Address
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <ShippingForm />
        </div>
      </div>
    </div>
  );
}
