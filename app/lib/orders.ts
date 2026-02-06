// app/lib/orders.ts
export type Order = {
  slug: string;
  customerName: string;
  title: string;
  currency: "EUR" | "USD" | "GBP";
  price: number;

  notes?: string;
  items?: Array<{ label: string; value: string }>;

  // MANUAL PayPal checkout link (one per order)
  paypalLink: string;
};

export const ORDERS: Order[] = [
  {
    slug: "xx-2-17012",
    customerName: "John",
    title: "PCXX-2",
    currency: "USD",
    price: 1999,
    notes: "This payment link is for John only.",
    items: [
      { label: "CPU", value: "Ryzen 7 7800X3D" },
      { label: "GPU", value: "RTX 4070 Ti" },
      { label: "RAM", value: "32GB DDR5" },
      { label: "Storage", value: "2TB NVMe" },
    ],
    paypalLink: "https://www.paypal.com/ncp/payment/MMB3235MM7J72",
  },
];

export function getOrder(slug: string) {
  return ORDERS.find((o) => o.slug === slug);
}
