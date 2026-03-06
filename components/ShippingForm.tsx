"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCheckout } from "@/context/CheckoutContext";
import {
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Check,
  AlertCircle,
  Lock,
} from "lucide-react";
import { useState } from "react";

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

const defaultValues: ShippingFormData = {
  fullName: "",
  email: "",
  phone: "",
  pinCode: "",
  city: "",
  state: "",
};

function AddressForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: ShippingFormData;
  onSave: (data: ShippingFormData) => void;
  onCancel: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: initial ?? defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80">Full Name</label>
          <input
            {...register("fullName")}
            type="text"
            placeholder="Ex: John Doe"
            className={`w-full border rounded-xl px-4 py-2.5 text-sm transition-all duration-200 outline-none bg-background
                ${errors.fullName ? "border-destructive bg-destructive/5 focus:border-destructive focus:ring-2 focus:ring-destructive/20" : "border-input focus:border-accent-green focus:ring-2 focus:ring-accent-green/20"}`}
          />
          {errors.fullName && (
            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errors.fullName.message}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80">Email Address</label>
          <input
            {...register("email")}
            type="email"
            placeholder="Ex: john@example.com"
            className={`w-full border rounded-xl px-4 py-2.5 text-sm transition-all duration-200 outline-none bg-background
              ${errors.email ? "border-destructive bg-destructive/5 focus:border-destructive focus:ring-2 focus:ring-destructive/20" : "border-input focus:border-accent-green focus:ring-2 focus:ring-accent-green/20"}`}
          />
          {errors.email && (
            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80">Phone Number</label>
          <div className="relative">
            <span className="absolute left-4 top-2.5 text-muted-foreground text-sm">+91</span>
            <input
              {...register("phone")}
              type="tel"
              placeholder="98765 43210"
              className={`w-full border rounded-xl pl-12 pr-4 py-2.5 text-sm transition-all duration-200 outline-none bg-background
                ${errors.phone ? "border-destructive bg-destructive/5 focus:border-destructive focus:ring-2 focus:ring-destructive/20" : "border-input focus:border-accent-green focus:ring-2 focus:ring-accent-green/20"}`}
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errors.phone.message}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80">PIN Code</label>
          <input
            {...register("pinCode")}
            type="text"
            placeholder="Ex: 560001"
            maxLength={6}
            className={`w-full border rounded-xl px-4 py-2.5 text-sm transition-all duration-200 outline-none bg-background
              ${errors.pinCode ? "border-destructive bg-destructive/5 focus:border-destructive focus:ring-2 focus:ring-destructive/20" : "border-input focus:border-accent-green focus:ring-2 focus:ring-accent-green/20"}`}
          />
          {errors.pinCode && (
            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errors.pinCode.message}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80">City</label>
          <input
            {...register("city")}
            type="text"
            placeholder="Ex: Bengaluru"
            className={`w-full border rounded-xl px-4 py-2.5 text-sm transition-all duration-200 outline-none bg-background
              ${errors.city ? "border-destructive bg-destructive/5 focus:border-destructive focus:ring-2 focus:ring-destructive/20" : "border-input focus:border-accent-green focus:ring-2 focus:ring-accent-green/20"}`}
          />
          {errors.city && (
            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errors.city.message}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80">State</label>
          <input
            {...register("state")}
            type="text"
            placeholder="Ex: Karnataka"
            className={`w-full border rounded-xl px-4 py-2.5 text-sm transition-all duration-200 outline-none bg-background
              ${errors.state ? "border-destructive bg-destructive/5 focus:border-destructive focus:ring-2 focus:ring-destructive/20" : "border-input focus:border-accent-green focus:ring-2 focus:ring-accent-green/20"}`}
          />
          {errors.state && (
            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errors.state.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-green text-accent-green-foreground font-medium text-sm hover:opacity-90 transition-all duration-300 disabled:opacity-60"
        >
          <Check className="w-4 h-4" />
          {initial ? "Update address" : "Save address"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-input bg-background font-medium text-sm hover:bg-accent transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function ShippingForm() {
  const {
    shippingAddresses,
    selectedAddressIndex,
    setSelectedAddressIndex,
    addShippingAddress,
    updateShippingAddress,
    removeShippingAddress,
  } = useCheckout();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAdd = (data: ShippingFormData) => {
    addShippingAddress(data);
    setShowAddForm(false);
  };

  const handleUpdate = (data: ShippingFormData) => {
    if (editingIndex !== null) {
      updateShippingAddress(editingIndex, data);
      setEditingIndex(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-border bg-muted/30">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-green/15 text-accent-green transition-colors duration-300">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Delivery addresses</h2>
            <p className="text-sm text-muted-foreground">Add one or more addresses and choose where to deliver.</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {shippingAddresses.length === 0 && !showAddForm && (
            <div className="rounded-xl border border-dashed border-border bg-muted/20 p-8 text-center">
              <p className="text-muted-foreground text-sm mb-4">No addresses yet. Add your first delivery address.</p>
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-green text-accent-green-foreground font-medium text-sm hover:opacity-90 transition-all duration-300"
              >
                <Plus className="h-4 w-4" />
                Add address
              </button>
            </div>
          )}

          {shippingAddresses.map((addr, index) => (
            <div key={addr.id ?? index} className="rounded-xl border border-border bg-background overflow-hidden transition-shadow hover:shadow-md">
              {editingIndex === index ? (
                <div className="p-5 border-b border-border bg-muted/20">
                  <p className="text-sm font-medium text-foreground mb-4">Edit address</p>
                  <AddressForm
                    initial={addr}
                    onSave={handleUpdate}
                    onCancel={() => setEditingIndex(null)}
                  />
                </div>
              ) : (
                <div
                  className="flex flex-wrap items-start justify-between gap-4 p-5 cursor-pointer transition-colors hover:bg-muted/30"
                  onClick={() => setSelectedAddressIndex(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedAddressIndex(index);
                    }
                  }}
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        selectedAddressIndex === index
                          ? "border-accent-green bg-accent-green text-accent-green-foreground"
                          : "border-muted-foreground/40 bg-background"
                      }`}
                    >
                      {selectedAddressIndex === index && <Check className="h-3 w-3" strokeWidth={3} />}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground">{addr.fullName}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{addr.email}</p>
                      <p className="text-sm text-muted-foreground">{addr.phone}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {addr.city}, {addr.state} — {addr.pinCode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => setEditingIndex(index)}
                      className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      aria-label="Edit address"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeShippingAddress(index)}
                      className="p-2 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                      aria-label="Remove address"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {showAddForm && (
            <div className="rounded-xl border border-border bg-muted/10 p-5">
              <p className="text-sm font-medium text-foreground mb-4">New delivery address</p>
              <AddressForm
                onSave={handleAdd}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          )}

          {shippingAddresses.length > 0 && !showAddForm && (
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-border text-muted-foreground hover:bg-muted/30 hover:text-foreground hover:border-foreground/20 transition-colors text-sm font-medium"
            >
              <Plus className="h-4 w-4" />
              Add another address
            </button>
          )}
        </div>

        <div className="px-6 py-4 border-t border-border bg-muted/20 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="w-3 h-3" />
          <span>Your data is safe with us</span>
        </div>
      </div>
    </div>
  );
}
