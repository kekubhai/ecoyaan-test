"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";

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

  const inputClasses =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all";
  const errorClasses = "text-red-500 text-sm mt-1";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className={labelClasses}>
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          placeholder="Enter your full name"
          {...register("fullName")}
          className={inputClasses}
        />
        {errors.fullName && (
          <p className={errorClasses}>{errors.fullName.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClasses}>
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          className={inputClasses}
        />
        {errors.email && (
          <p className={errorClasses}>{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className={labelClasses}>
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="10-digit mobile number"
          {...register("phone")}
          className={inputClasses}
        />
        {errors.phone && (
          <p className={errorClasses}>{errors.phone.message}</p>
        )}
      </div>

      {/* PIN Code and City Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="pinCode" className={labelClasses}>
            PIN Code
          </label>
          <input
            id="pinCode"
            type="text"
            placeholder="6-digit PIN"
            {...register("pinCode")}
            className={inputClasses}
          />
          {errors.pinCode && (
            <p className={errorClasses}>{errors.pinCode.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="city" className={labelClasses}>
            City
          </label>
          <input
            id="city"
            type="text"
            placeholder="Your city"
            {...register("city")}
            className={inputClasses}
          />
          {errors.city && (
            <p className={errorClasses}>{errors.city.message}</p>
          )}
        </div>
      </div>

      {/* State */}
      <div>
        <label htmlFor="state" className={labelClasses}>
          State
        </label>
        <input
          id="state"
          type="text"
          placeholder="Your state"
          {...register("state")}
          className={inputClasses}
        />
        {errors.state && (
          <p className={errorClasses}>{errors.state.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
      >
        {isSubmitting ? "Saving..." : "Continue to Payment →"}
      </button>
    </form>
  );
}
