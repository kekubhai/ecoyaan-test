// This is a SERVER COMPONENT — data fetching happens on the server
import { headers } from "next/headers";
import CartClient from "./CartClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getCartData() {
  const h = await headers();
  const host = h.get("host");
  if (!host) throw new Error("Missing Host header");

  const proto = h.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;

  const res = await fetch(`${baseUrl}/api/cart`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch cart: ${res.status}`);
  return res.json();
}

export default async function CartPage() {
  const data = await getCartData(); // SSR
  return <CartClient initialData={data} />;
}