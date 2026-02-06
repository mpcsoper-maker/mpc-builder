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
    slug: "",
    name: "out of stock",
    price: 0,
    discount: 0,
    image: null,
    parts: [
      { category: "CPU", name: "Ryzen 5 7600", price: 175 },
      { category: "GPU", name: " MSI GeForce RTX 5070 12G", price: 669 },
      { category: "RAM", name: "Crucial Pro OC Schwarz 32GB Kit (2x16GB) DDR5-6000 CL36", price: 399 },
      { category: "Storage", name: "1 tb 990 pro", price: 299,},
      { category: "Motherboard", name: "msi B605 tomahawk", price: 180 },
      { category: "PSU", name: "mpcs 7502", price: 0 },
      { category: "Case", name: "m-pcs case", price: 0 },
    ],
  },
];
