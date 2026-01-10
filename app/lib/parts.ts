export type PartCategory =
  | "cpu"
  | "gpu"
  | "motherboard"
  | "ram"
  | "ssd"
  | "psu"
  | "case"
  | "cooler";

export type Part = {
  id: string;
  name: string;
  price: number;
};

export const parts: Record<PartCategory, Part[]> = {

  cpu: [
    { id: "r5-5600", name: "AMD Ryzen 5 5600", price: 109 },
    { id: "r5-5600x", name: "AMD Ryzen 5 5600X", price: 129 },
    { id: "r7-5700x", name: "AMD Ryzen 7 5700X", price: 169 },
    { id: "r7-5800x3d", name: "AMD Ryzen 7 5800X3D", price: 279 },
    { id: "r9-5900x", name: "AMD Ryzen 9 5900X", price: 309 },

    { id: "r5-7600", name: "AMD Ryzen 5 7600", price: 169 },
    { id: "r5-7600x", name: "AMD Ryzen 5 7600X", price: 189 },
    { id: "r7-7700x", name: "AMD Ryzen 7 7700X", price: 300 },
    { id: "r7-7800X3D", name: "AMD Ryzen 7 7800X3D", price: 379 },
    { id: "r9-7900x", name: "AMD Ryzen 9 7900X", price: 449 },

    { id: "i5-12400f", name: "Intel Core i5-12400F", price: 139 },
    { id: "i5-13400f", name: "Intel Core i5-13400F", price: 179 },
    { id: "i5-14600k", name: "Intel Core i5-14600K", price: 299 },
    { id: "i7-13700k", name: "Intel Core i7-13700K", price: 399 },
    { id: "i7-14700k", name: "Intel Core i7-14700K", price: 449 },
    { id: "i9-14900k", name: "Intel Core i9-14900K", price: 569 },
  ],

  gpu: [
    { id: "rtx3050", name: "NVIDIA RTX 3050 8GB", price: 179 },
    { id: "rtx3060", name: "NVIDIA RTX 3060 12GB", price: 229 },
    { id: "rtx3060ti", name: "NVIDIA RTX 3060 Ti", price: 279 },
    { id: "rtx3070", name: "NVIDIA RTX 3070", price: 349 },
    { id: "rtx3070ti", name: "NVIDIA RTX 3070 Ti", price: 399 },

    { id: "rtx3080", name: "NVIDIA RTX 3080", price: 499 },
    { id: "rtx4080", name: "NVIDIA RTX 4080", price: 999 },
    { id: "rtx4090", name: "NVIDIA RTX 4090", price: 1599 },

    { id: "rtx5060", name: "NVIDIA RTX 5060 (current gen)", price: 449 },
    { id: "rtx5070", name: "NVIDIA RTX 5070 (current gen)", price: 689 },
    { id: "rtx5080", name: "NVIDIA RTX 5080 (current gen)", price: 999 },
    { id: "rtx5090", name: "NVIDIA RTX 5090 (top end)", price: 1699 },
  ],

  motherboard: [
    { id: "b550a", name: "ASUS B550-PLUS ATX", price: 119 },
    { id: "b550t", name: "MSI B550 Tomahawk MAX", price: 139 },
    { id: "x570a", name: "Gigabyte X570 AORUS Elite", price: 169 },
    { id: "b660m", name: "ASUS B660M-A Prime", price: 119 },
    { id: "z690a", name: "MSI Z690-A PRO", price: 189 },
    { id: "z790p", name: "ASUS Z790-P Prime", price: 219 },
  ],

  ram: [
    { id: "fury16", name: "Kingston Fury Beast 16GB DDR4-3200", price: 39 },
    { id: "fury32", name: "Kingston Fury Beast 32GB DDR4-3600", price: 69 },
    { id: "fury64", name: "Kingston Fury Beast 64GB DDR4-3600", price: 129 },
    { id: "ddr5-32", name: "DDR5 32GB Kit (generic, 5600MT/s)", price: 189 },
    { id: "ddr5-64", name: "DDR5 64GB Kit (generic, 5600MT/s)", price: 359 },
  ],

  ssd: [
    { id: "s980pro-1tb", name: "Samsung 980 PRO 1TB NVMe", price: 109 },
    { id: "s980pro-2tb", name: "Samsung 980 PRO 2TB NVMe", price: 189 },
    { id: "s990pro-1tb", name: "Samsung 990 PRO 1TB NVMe", price: 129 },
    { id: "s990pro-2tb", name: "Samsung 990 PRO 2TB NVMe", price: 219 },
    { id: "s990pro-4tb", name: "Samsung 990 PRO 4TB NVMe", price: 369 },
  ],

  psu: [
    { id: "rm650", name: "Corsair RM650 650W Gold", price: 89 },
    { id: "rm750", name: "Corsair RM750 750W Gold", price: 109 },
    { id: "rm850", name: "Corsair RM850x 850W Gold", price: 129 },
    { id: "rm1000", name: "Corsair RM1000x 1000W Gold", price: 179 },
  ],

  case: [
    { id: "h510", name: "NZXT H510", price: 69 },
    { id: "meshify", name: "Fractal Meshify C", price: 89 },
    { id: "p400a", name: "Phanteks P400A Airflow", price: 79 },
    { id: "o11", name: "Lian Li O11 Dynamic", price: 139 },
    { id: "h9flow", name: "NZXT H9 Flow", price: 159 },
  ],

  cooler: [
    { id: "hyper212", name: "Cooler Master Hyper 212", price: 29 },
    { id: "nhd15", name: "Noctua NH-D15", price: 89 },
    { id: "h100i", name: "Corsair H100i 240mm AIO", price: 119 },
    { id: "arctic280", name: "Arctic Liquid Freezer II 280", price: 129 },
    { id: "kraken360", name: "NZXT Kraken 360mm AIO", price: 179 },
  ],
};
