import { NextResponse } from "next/server";
import { readOrders } from "@/app/lib/ordersStore";

export async function GET() {
  const orders = readOrders();
  return NextResponse.json({ orders });
}
