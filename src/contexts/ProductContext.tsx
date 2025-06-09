import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

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
  loading: boolean;
  addProduct: (product: Omit<Product, "id" | "lastUpdated">) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProduct: (id: string) => Product | undefined;
  getLowStockProducts: () => Product[];
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
        return;
      }

      const formattedProducts: Product[] = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.category,
        image: item.image,
        barcode: item.barcode,
        stock: item.stock,
        minStock: item.min_stock,
        description: item.description,
        supplier: item.supplier,
        lastUpdated: new Date(item.updated_at),
      }));

      setProducts(formattedProducts);
    } catch (error) {
      console.error("Error in refreshProducts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const addProduct = async (
    productData: Omit<Product, "id" | "lastUpdated">,
  ) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert({
          name: productData.name,
          price: productData.price,
          category: productData.category,
          image: productData.image,
          barcode: productData.barcode,
          stock: productData.stock,
          min_stock: productData.minStock,
          description: productData.description,
          supplier: productData.supplier,
        })
        .select()
        .single();

      if (error) {
        console.error("Error adding product:", error);
        throw error;
      }

      await refreshProducts();
    } catch (error) {
      console.error("Error in addProduct:", error);
      throw error;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const updateData: any = {};
      if (updates.name !== undefined) updateData.name = updates.name;
      if (updates.price !== undefined) updateData.price = updates.price;
      if (updates.category !== undefined)
        updateData.category = updates.category;
      if (updates.image !== undefined) updateData.image = updates.image;
      if (updates.barcode !== undefined) updateData.barcode = updates.barcode;
      if (updates.stock !== undefined) updateData.stock = updates.stock;
      if (updates.minStock !== undefined)
        updateData.min_stock = updates.minStock;
      if (updates.description !== undefined)
        updateData.description = updates.description;
      if (updates.supplier !== undefined)
        updateData.supplier = updates.supplier;
      updateData.updated_at = new Date().toISOString();

      const { error } = await supabase
        .from("products")
        .update(updateData)
        .eq("id", id);

      if (error) {
        console.error("Error updating product:", error);
        throw error;
      }

      await refreshProducts();
    } catch (error) {
      console.error("Error in updateProduct:", error);
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) {
        console.error("Error deleting product:", error);
        throw error;
      }

      await refreshProducts();
    } catch (error) {
      console.error("Error in deleteProduct:", error);
      throw error;
    }
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
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
        getLowStockProducts,
        refreshProducts,
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
