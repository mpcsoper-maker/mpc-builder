import { NextResponse } from "next/server";
import { readOrders, writeOrders } from "@/app/lib/ordersStore";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const orders = readOrders().filter((o: any) => o.id !== params.id);
  writeOrders(orders);
  return NextResponse.json({ success: true });
}
