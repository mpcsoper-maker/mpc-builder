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
    name: "Mpcs mid-tier gaming pc",
    price: 1820,
    discount: 20,
    image: null,
    parts: [
      { category: "CPU", name: "Ryzen 5 7600", price: 175 },
      { category: "GPU", name: " MSI GeForce RTX 5070 12G", price: 669 },
      { category: "RAM", name: "Crucial Pro OC Schwarz 32GB Kit (2x16GB) DDR5-6000 CL36", price: 399 },
      { category: "Storage", name: "1 tb 990 pro", price: 199,},
      { category: "Motherboard", name: "msi B605 tomahawk", price: 180 },
      { category: "PSU", name: "be quiet! 750W", price: 85 },
      { category: "Case", name: "NZXT H5 Flow (2024) Black", price: 100 },
    ],
  },
  {
    slug: "xxx-2",
    name: "Mpcs gaming pc",
    price: 1358,
    discount: 20,
    image: null,
    parts: [
      { category: "CPU", name: "Ryzen 5 7600", price: 175 },
      { category: "GPU", name: " MSI GeForce RTX 5060 8G", price: 340 },
      { category: "RAM", name: "Crucial Pro OC Schwarz 32GB Kit (2x16GB) DDR5-6000 CL36", price: 399 },
      { category: "Storage", name: "1 tb 990 pro", price: 199,},
      { category: "Motherboard", name: "msi B605 tomahawk", price: 180 },
      { category: "PSU", name: "m-pcs 750w", price: 85 },
      { category: "Case", name: "m-pcs case", price: 100 },
    ],
  },
];
