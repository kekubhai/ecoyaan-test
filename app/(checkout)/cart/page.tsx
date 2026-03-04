// This is a SERVER COMPONENT — data fetching happens on the server
import CartClient from "./CartClient";

async function getCartData() {
  // In prod: fetch from real API. Here: direct import for SSR demo
  const res = await fetch("http://localhost:3000/api/cart", { cache: "no-store" });
  return res.json();
}

export default async function CartPage() {
  const data = await getCartData(); // ← This is the SSR part
  return <CartClient initialData={data} />;
}