"use client";
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import type { CartItem, ShippingAddress } from "@/types";

const STORAGE_KEY = "ecoyaan_checkout";

type PersistedState = {
  cartItems: CartItem[];
  shippingFee: number;
  discount: number;
  shippingAddresses: ShippingAddress[];
  selectedAddressIndex: number;
};

function loadPersisted(): Partial<PersistedState> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as PersistedState;
    return {
      cartItems: data.cartItems ?? [],
      shippingFee: data.shippingFee ?? 0,
      discount: data.discount ?? 0,
      shippingAddresses: Array.isArray(data.shippingAddresses) ? data.shippingAddresses : [],
      selectedAddressIndex: typeof data.selectedAddressIndex === "number" ? Math.max(0, data.selectedAddressIndex) : 0,
    };
  } catch {
    return null;
  }
}

function savePersisted(state: PersistedState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) {}
}

type CheckoutState = {
  cartItems: CartItem[];
  shippingFee: number;
  discount: number;
  shippingAddresses: ShippingAddress[];
  selectedAddressIndex: number;
  /** Selected address for payment (derived from list); null if list empty */
  shippingAddress: ShippingAddress | null;
  setCartItems: (items: CartItem[]) => void;
  setShippingFee: (fee: number) => void;
  setDiscount: (discount: number) => void;
  setShippingAddresses: (addresses: ShippingAddress[]) => void;
  setSelectedAddressIndex: (index: number) => void;
  addShippingAddress: (address: ShippingAddress) => void;
  updateShippingAddress: (index: number, address: ShippingAddress) => void;
  removeShippingAddress: (index: number) => void;
  setShippingAddress: (address: ShippingAddress) => void;
};

const CheckoutContext = createContext<CheckoutState | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingFee, setShippingFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingAddresses, setShippingAddresses] = useState<ShippingAddress[]>([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  const shippingAddress =
    shippingAddresses.length > 0 && selectedAddressIndex >= 0 && selectedAddressIndex < shippingAddresses.length
      ? shippingAddresses[selectedAddressIndex]
      : null;

  useEffect(() => {
    const loaded = loadPersisted();
    if (loaded) {
      if (loaded.cartItems?.length) setCartItems(loaded.cartItems);
      if (typeof loaded.shippingFee === "number") setShippingFee(loaded.shippingFee);
      if (typeof loaded.discount === "number") setDiscount(loaded.discount);
      if (loaded.shippingAddresses?.length) {
        setShippingAddresses(loaded.shippingAddresses);
        setSelectedAddressIndex(Math.min(loaded.selectedAddressIndex ?? 0, loaded.shippingAddresses.length - 1));
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    savePersisted({
      cartItems,
      shippingFee,
      discount,
      shippingAddresses,
      selectedAddressIndex: Math.min(selectedAddressIndex, Math.max(0, shippingAddresses.length - 1)),
    });
  }, [hydrated, cartItems, shippingFee, discount, shippingAddresses, selectedAddressIndex]);

  const addShippingAddress = useCallback((address: ShippingAddress) => {
    const withId = { ...address, id: address.id ?? `addr-${Date.now()}-${Math.random().toString(36).slice(2, 9)}` };
    setShippingAddresses((prev) => [...prev, withId]);
    setSelectedAddressIndex((prev) => (prev < 0 ? 0 : prev));
  }, []);

  const updateShippingAddress = useCallback((index: number, address: ShippingAddress) => {
    setShippingAddresses((prev) => {
      const next = [...prev];
      if (index >= 0 && index < next.length) {
        next[index] = { ...address, id: next[index].id ?? address.id };
      }
      return next;
    });
  }, []);

  const removeShippingAddress = useCallback((index: number) => {
    setShippingAddresses((prev) => prev.filter((_, i) => i !== index));
    setSelectedAddressIndex((prev) => {
      if (prev >= index && prev > 0) return prev - 1;
      if (prev >= index && prev === 0) return 0;
      return prev;
    });
  }, []);

  const setShippingAddress = useCallback((address: ShippingAddress) => {
    const withId = { ...address, id: address.id ?? `addr-${Date.now()}-${Math.random().toString(36).slice(2, 9)}` };
    setShippingAddresses((prev) => {
      const existing = prev.findIndex((a) => a.id === withId.id || (a.email === withId.email && a.fullName === withId.fullName));
      if (existing >= 0) {
        const next = [...prev];
        next[existing] = withId;
        setSelectedAddressIndex(existing);
        return next;
      }
      setSelectedAddressIndex(prev.length);
      return [...prev, withId];
    });
  }, []);

  return (
    <CheckoutContext.Provider
      value={{
        cartItems,
        shippingFee,
        discount,
        shippingAddresses,
        selectedAddressIndex,
        shippingAddress,
        setCartItems,
        setShippingFee,
        setDiscount,
        setShippingAddresses,
        setSelectedAddressIndex,
        addShippingAddress,
        updateShippingAddress,
        removeShippingAddress,
        setShippingAddress,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used inside CheckoutProvider");
  return ctx;
};
