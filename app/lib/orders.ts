// app/lib/orders.ts
export type Order = {
  slug: string;
  customerName: string;
  title: string;
  currency: "EUR" | "USD" | "GBP";
  price: number;

  notes?: string;
  items?: Array<{ label: string; value: string }>;

  paypalLink?: string;
  stripeLink?: string;
};

export const ORDERS: Order[] = [
  {
    slug: "MPC-xx-12",
    customerName: "John",
    title: "Custom Gaming PC",
    currency: "USD",
    price: 1499,
    stripeLink: "https://buy.stripe.com/7sYbJ3ezJfhG6bQguL2wU00",
  },
];

export function getOrder(slug: string) {
  return ORDERS.find((o) => o.slug === slug);
}