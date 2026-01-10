import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "orders.json");

export function readOrders() {
  try {
    if (!fs.existsSync(FILE)) return [];
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch {
    return [];
  }
}

export function writeOrders(orders: any[]) {
  fs.writeFileSync(FILE, JSON.stringify(orders, null, 2));
}
