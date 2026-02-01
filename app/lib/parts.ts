export type PartCategory =
  | "cpu"
  | "gpu"
  | "motherboard"
  | "ram"
  | "ssd"
  | "hdd"
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
    { id: "r5-5600", name: "AMD Ryzen 5 5600", price: 123 },
    { id: "r7-5800x3d", name: "AMD Ryzen 7 5800XT", price: 209 },
    { id: "r9-5900x", name: "AMD Ryzen 9 9900X", price: 372 },

    { id: "r5-7600", name: "AMD Ryzen 5 7600", price: 162 },
    { id: "r5-7600x", name: "AMD Ryzen 5 7600X", price: 169 },
    { id: "r7-7700x", name: "AMD Ryzen 7 7700X", price: 221 },
    { id: "r7-7800X3D", name: "AMD Ryzen 7 7800X3D", price: 359 },
    { id: "r9-7900x", name: "AMD Ryzen 9 7900X", price: 307 },

    { id: "i5-12400f", name: "Intel Core i5-12400F", price: 133 },
    { id: "i5-13400f", name: "Intel Core i5-13400F", price: 172 },
    { id: "i7-14700k", name: "Intel Core i7-14700K", price: 344 },
    { id: "i9-14900k", name: "Intel Core i9-14900K", price: 453 },
  ],

  gpu: [
    { id: "rtx3060", name: "NVIDIA RTX 3060 12GB", price: 349 },
    { id: "rtx3060ti", name: "msi NVIDIA RTX 3060 Ti", price: 449 },

    { id: "rtx3080", name: "NVIDIA RTX 3080", price: 697 },

    { id: "rtx5060", name: "msi NVIDIA RTX 5060 8G", price: 339 },
    { id: "rtx5070", name: "GIGABYTE NVIDIA RTX 5070 12G", price: 699 },
    { id: "rtx5080", name: "msi NVIDIA RTX 5080 16G", price: 1449 },
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
    { id: "fury16", name: "Kingston FURY Beast Schwarz 16GB Kit (2x8GB) DDR4-3200 CL16", price: 229 },
    { id: "fury32", name: "Kingston FURY Beast Schwarz 32GB Kit (2x16GB) DDR4-3600 CL18", price: 299 },
    { id: "fury64", name: "Kingston FURY Beast Schwarz 64GB Kit (2x32GB) DDR4-3200 CL16", price: 559 },
    { id: "ddr5-32", name: "Crucial Pro OC Schwarz 32GB Kit (2x16GB) DDR5-6000 CL36", price: 399 },
    { id: "ddr5-64", name: "Crucial Pro OC Schwarz 64GB Kit (2x32GB) DDR5-6000 CL40", price: 694 },
  ],

  ssd: [
    { id: "s990pro-1tb", name: "Samsung 990 PRO 1TB NVMe", price: 299 },
    { id: "s990pro-2tb", name: "Samsung 990 PRO 2TB NVMe", price: 399 },
  ],

  hdd: [
    { id: "hdd1", name: "HDD 500 GB", price: 30 },
    { id: "hdd2", name: "HDD 1 TB", price: 50 },
    { id: "hdd3", name: "HDD 2 TB", price: 70 },
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
