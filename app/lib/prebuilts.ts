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
    slug: "xx-1",
    name: "m-pcs",
    price: 1569,
    discount: 0,
    image: "/Screenshot 2026-02-06 233701.png",
    parts: [
      { category: "CPU", name: "Ryzen 5 7600", price: 165 },
      { category: "GPU", name: " MSI GeForce RTX 5070 12G", price: 647 },
      { category: "RAM", name: "Crucial Pro OC Schwarz 32GB Kit (2x16GB) DDR5-6000 CL36", price: 399 },
      { category: "Storage", name: "Lexar NQ790 SSD 1TB M.2 2280 PCIe Gen4 NVMe", price: 124,},
      { category: "Motherboard", name: "ASRock B650M-H/M.2+ Mainboard", price: 80 },
      { category: "PSU", name: "be quiet! SYSTEM POWER 11 750W | PC-Netzteil", price: 72 },
      { category: "Case", name: "case", price: 75 },
      { category: "m-pcs-cut", name: "m-pcs-cut", price: 7 },
      { category: "ship", name: "shiping to ireland", price: 26 },
    ],
  },
];
