"use client";

import { Check } from "lucide-react";

type Props = {
  currentStep: 1 | 2 | 3;
};

const steps = [
  { id: 1, label: "Cart" },
  { id: 2, label: "Shipping" },
  { id: 3, label: "Payment" },
] as const;

export default function StepIndicator({ currentStep }: Props) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-10 px-4">
      <div className="relative flex items-center justify-between">
        {/* Background Line */}
        <div className="absolute top-4 sm:top-5 left-0 w-full -z-10 px-2">
          <div className="h-0.5 w-full bg-gray-200 rounded-full" />
        </div>
        
        {/* Progress Line */}
        <div className="absolute top-4 sm:top-5 left-0 w-full -z-10 px-2">
          <div 
            className="h-0.5 bg-green-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
             // Added bg-gray-50 to mask the line if needed, but z-index handles it.
             // Actually, if the line goes through, we want the circle to cover it.
             // The circle has bg-white or bg-green-600, so it covers the line.
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`
                  flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 text-sm sm:text-base font-semibold transition-all duration-300
                  ${
                    isCompleted
                      ? "border-green-600 bg-green-600 text-white shadow-md shadow-green-100"
                      : isCurrent
                      ? "border-green-600 bg-white text-green-600 ring-4 ring-green-50 scale-110"
                      : "border-gray-300 bg-white text-gray-400"
                  }
                `}
              >
                {isCompleted ? <Check className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={3} /> : step.id}
              </div>
              
              <span
                className={`
                  mt-2 text-xs sm:text-sm font-medium transition-colors duration-300
                  ${
                    isCurrent || isCompleted
                      ? "text-gray-800 font-semibold"
                      : "text-gray-400"
                  }
                `}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}


