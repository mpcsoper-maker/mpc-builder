import { NextResponse } from "next/server";
import { readOrders, writeOrders } from "@/app/lib/ordersStore";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const body = await req.json();

  const orders = readOrders();
  orders.unshift({
    id: randomUUID(),
    ...body,
    createdAt: new Date().toISOString(),
  });

  writeOrders(orders);
  return NextResponse.json({ success: true });
}
