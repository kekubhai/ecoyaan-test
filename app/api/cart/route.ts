import { NextResponse } from "next/server";
import { mockCart } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json(mockCart);
}