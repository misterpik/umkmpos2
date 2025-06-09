import React, { createContext, useContext, useState, ReactNode } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  barcode?: string;
  stock: number;
  minStock?: number;
  description?: string;
  supplier?: string;
  lastUpdated?: Date;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id" | "lastUpdated">) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  getLowStockProducts: () => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Indomie Goreng",
    price: 3500,
    category: "Makanan",
    stock: 50,
    minStock: 10,
    barcode: "8992753102504",
    description: "Mie instan rasa ayam goreng",
    supplier: "PT Indofood",
    lastUpdated: new Date(),
  },
  {
    id: "2",
    name: "Aqua 600ml",
    price: 5000,
    category: "Minuman",
    stock: 30,
    minStock: 15,
    barcode: "8992952042309",
    description: "Air mineral dalam kemasan",
    supplier: "PT Aqua Golden Mississippi",
    lastUpdated: new Date(),
  },
  {
    id: "3",
    name: "Teh Botol Sosro",
    price: 6000,
    category: "Minuman",
    stock: 25,
    minStock: 12,
    barcode: "8992761002001",
    description: "Teh dalam kemasan botol",
    supplier: "PT Sinar Sosro",
    lastUpdated: new Date(),
  },
  {
    id: "4",
    name: "Sabun Lifebuoy",
    price: 4500,
    category: "Perawatan",
    stock: 20,
    minStock: 8,
    barcode: "8992772051001",
    description: "Sabun mandi antibakteri",
    supplier: "PT Unilever Indonesia",
    lastUpdated: new Date(),
  },
  {
    id: "5",
    name: "Pepsodent",
    price: 12000,
    category: "Perawatan",
    stock: 15,
    minStock: 5,
    barcode: "8992772076004",
    description: "Pasta gigi untuk keluarga",
    supplier: "PT Unilever Indonesia",
    lastUpdated: new Date(),
  },
  {
    id: "6",
    name: "Chitato",
    price: 10000,
    category: "Makanan",
    stock: 40,
    minStock: 15,
    barcode: "8992688218001",
    description: "Keripik kentang rasa original",
    supplier: "PT Indofood Fritolay Makmur",
    lastUpdated: new Date(),
  },
  {
    id: "7",
    name: "Pocari Sweat",
    price: 7500,
    category: "Minuman",
    stock: 35,
    minStock: 10,
    barcode: "8992696427001",
    description: "Minuman isotonik",
    supplier: "PT Pocari Sweat Indonesia",
    lastUpdated: new Date(),
  },
  {
    id: "8",
    name: "Mie Sedaap",
    price: 3000,
    category: "Makanan",
    stock: 45,
    minStock: 12,
    barcode: "8992952042101",
    description: "Mie instan rasa ayam bawang",
    supplier: "PT Karunia Alam Segar",
    lastUpdated: new Date(),
  },
];

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (productData: Omit<Product, "id" | "lastUpdated">) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      lastUpdated: new Date(),
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, ...updates, lastUpdated: new Date() }
          : product,
      ),
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const getProduct = (id: string) => {
    return products.find((product) => product.id === id);
  };

  const getLowStockProducts = () => {
    return products.filter(
      (product) => product.stock <= (product.minStock || 0),
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
        getLowStockProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

export type { Product };
