"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import { MapPin, Lock, ArrowRight, AlertCircle } from "lucide-react";

const shippingSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]{10}$/, "Phone must be exactly 10 digits"),
  pinCode: z
    .string()
    .min(1, "PIN code is required")
    .regex(/^[0-9]{6}$/, "PIN code must be exactly 6 digits"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

export default function ShippingForm() {
  const router = useRouter();
  const { setShippingAddress } = useCheckout();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      pinCode: "",
      city: "",
      state: "",
    },
  });

  const onSubmit = (data: ShippingFormData) => {
    setShippingAddress(data);
    router.push("/payment");
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6 sm:mb-8 pb-4 border-b border-gray-100">
        <div className="bg-green-100 p-2 rounded-full">
          <MapPin className="w-5 h-5 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Shipping Details</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-600">Full Name</label>
            <input
              {...register("fullName")}
              type="text"
              placeholder="Ex: John Doe"
              className={`w-full border rounded-xl px-4 py-2.5 text-sm transition-all duration-200 outline-none
                ${errors.fullName 
                  ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100" 
                  : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                }`}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-600">Email Address</label>
            <input
              {...register("email")}
              type="email"
              placeholder="Ex: john@example.com"
              className={`w-full border rounded-xl px-4 py-2.5 text-sm transition-all duration-200 outline-none
                ${errors.email
                  ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100" 
                  : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-600">Phone Number</label>
            <div className="relative">
              <span className="absolute left-4 top-2.5 text-gray-400 text-sm">+91</span>
              <input
                {...register("phone")}
                type="tel"
                placeholder="98765 43210"
                className={`w-full border rounded-xl pl-12 pr-4 py-2.5 text-sm transition-all duration-200 outline-none
                  ${errors.phone 
                    ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100" 
                    : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  }`}
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* PIN Code */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-600">PIN Code</label>
            <input
              {...register("pinCode")}
              type="text"
              placeholder="Ex: 560001"
              maxLength={6}
              className={`w-full border rounded-xl px-4 py-2.5 text-sm transition-all duration-200 outline-none
                ${errors.pinCode 
                  ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100" 
                  : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                }`}
            />
            {errors.pinCode && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.pinCode.message}
              </p>
            )}
          </div>

          {/* City */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-600">City</label>
            <input
              {...register("city")}
              type="text"
              placeholder="Ex: Bengaluru"
              className={`w-full border rounded-xl px-4 py-2.5 text-sm transition-all duration-200 outline-none
                ${errors.city 
                  ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100" 
                  : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                }`}
            />
            {errors.city && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.city.message}
              </p>
            )}
          </div>

          {/* State */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-600">State</label>
            <input
              {...register("state")}
              type="text"
              placeholder="Ex: Karnataka"
              className={`w-full border rounded-xl px-4 py-2.5 text-sm transition-all duration-200 outline-none
                ${errors.state 
                  ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100" 
                  : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                }`}
            />
            {errors.state && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.state.message}
              </p>
            )}
          </div>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 group"
          >
            Continue to Payment
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-gray-400">
            <Lock className="w-3 h-3" />
            <span>Your data is safe with us</span>
          </div>
        </div>
      </form>
    </div>
  );
}


