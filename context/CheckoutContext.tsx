"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import type { CartItem, ShippingAddress } from "@/types";

type CheckoutState = {
  cartItems: CartItem[];
  shippingFee: number;
  shippingAddress: ShippingAddress | null;
  setCartItems: (items: CartItem[]) => void;
  setShippingFee: (fee: number) => void;
  setShippingAddress: (address: ShippingAddress) => void;
};

const CheckoutContext = createContext<CheckoutState | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingFee, setShippingFee] = useState(0);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);

  return (
    <CheckoutContext.Provider value={{
      cartItems, shippingFee, shippingAddress,
      setCartItems, setShippingFee, setShippingAddress
    }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used inside CheckoutProvider");
  return ctx;
};   