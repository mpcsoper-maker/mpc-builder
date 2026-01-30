export type PrebuiltPart = {
  category: string;
  name: string;
  price: number;
};

export type Prebuilt = {
  slug: string;
  name: string; // shown on card + detail
  price: number; // shown on card (quick price)
  discount?: number; // ✅ discount in EUR (optional)
  image?: string | null; // later if you add images
  parts: PrebuiltPart[];
};

export const PREBUILTS: Prebuilt[] = [
  {
    slug: "xxx-1",
    name: "budget work/gameing pc",
    price: 523,
    discount: 40, // ✅ CHANGE THIS (example: 50€ off)
    image: null,
    parts: [
      { category: "CPU", name: "E5 2680 v2 xeon", price: 30 },
      { category: "GPU", name: "rx 580", price: 103 },
      { category: "RAM", name: "32", price: 100 },
      { category: "Storage", name: "1 tb ssd", price: 100 },
      { category: "Motherboard", name: "soyo", price: 40 },
      { category: "PSU", name: "XXX", price: 80 },
      { category: "Case", name: "XXX", price: 70 },
    ],
  },
];
