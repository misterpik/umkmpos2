import React, { useState } from "react";
import {
  Search,
  Barcode,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Printer,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProducts, Product } from "@/contexts/ProductContext";

interface CartItem extends Product {
  quantity: number;
}

const POSInterface = () => {
  const { products, updateProduct } = useProducts();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [barcodeInput, setBarcodeInput] = useState("");

  const categories = ["Semua", "Makanan", "Minuman", "Perawatan"];

  // Filter products based on search query and active category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.barcode?.includes(searchQuery);
    const matchesCategory =
      activeCategory === "Semua" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Add product to cart
  const addToCart = (product: Product) => {
    if (product.stock <= 0) {
      alert("Stok produk habis!");
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          alert("Stok tidak mencukupi!");
          return prevCart;
        }
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove product from cart
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Update product quantity in cart
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  // Handle barcode scan
  const handleBarcodeScan = () => {
    const product = products.find((p) => p.barcode === barcodeInput);
    if (product) {
      addToCart(product);
      setBarcodeInput("");
    } else {
      alert("Produk tidak ditemukan!");
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Process payment
  const processPayment = () => {
    // Update product stock after successful payment
    cart.forEach((item) => {
      updateProduct(item.id, {
        stock: item.stock - item.quantity,
      });
    });

    // In a real app, this would handle payment processing
    alert(`Pembayaran berhasil dengan metode: ${paymentMethod}`);
    setCart([]);
    setIsCheckoutDialogOpen(false);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Panel - Product Catalog */}
      <div className="w-1/2 p-4 border-r overflow-y-auto">
        <div className="mb-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="relative">
            <Input
              placeholder="Scan barcode..."
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleBarcodeScan()}
              className="pl-8"
            />
            <Barcode className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-video bg-muted relative">
                <img
                  src={
                    product.image ||
                    `https://api.dicebear.com/7.x/shapes/svg?seed=${product.id}`
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{product.name}</h3>
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-bold">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                  <Button size="sm" onClick={() => addToCart(product)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Stok: {product.stock}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Panel - Cart & Checkout */}
      <div className="w-1/2 flex flex-col bg-muted/20">
        <div className="p-4 bg-background border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <h2 className="text-xl font-bold">Keranjang Belanja</h2>
            <Badge variant="secondary">{cart.length} item</Badge>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
              <ShoppingCart className="h-16 w-16 mb-4 opacity-20" />
              <p>Keranjang kosong</p>
              <p className="text-sm">Tambahkan produk dari katalog</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Rp {item.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-sm">Subtotal</span>
                      <span className="font-medium">
                        Rp{" "}
                        {(item.price * item.quantity).toLocaleString("id-ID")}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 bg-background border-t">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>Rp {calculateTotal().toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pajak (11%)</span>
              <span>
                Rp {(calculateTotal() * 0.11).toLocaleString("id-ID")}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>
                Rp {(calculateTotal() * 1.11).toLocaleString("id-ID")}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full"
                disabled={cart.length === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
              </Button>
              <Button
                className="w-full"
                disabled={cart.length === 0}
                onClick={() => setIsCheckoutDialogOpen(true)}
              >
                <CreditCard className="mr-2 h-4 w-4" /> Bayar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Dialog */}
      <Dialog
        open={isCheckoutDialogOpen}
        onOpenChange={setIsCheckoutDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pembayaran</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="font-medium">Ringkasan Belanja</h3>
              <div className="bg-muted p-4 rounded-md">
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>
                        Rp{" "}
                        {(item.price * item.quantity).toLocaleString("id-ID")}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>
                    Rp {(calculateTotal() * 1.11).toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Metode Pembayaran</h3>
              <Tabs defaultValue="cash" onValueChange={setPaymentMethod}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="cash">Tunai</TabsTrigger>
                  <TabsTrigger value="card">Kartu</TabsTrigger>
                  <TabsTrigger value="qris">QRIS</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="cash"
                  className="p-4 bg-muted rounded-md mt-2"
                >
                  <p className="text-sm">
                    Terima pembayaran tunai dari pelanggan.
                  </p>
                </TabsContent>
                <TabsContent
                  value="card"
                  className="p-4 bg-muted rounded-md mt-2"
                >
                  <p className="text-sm">
                    Gunakan mesin EDC untuk pembayaran kartu.
                  </p>
                </TabsContent>
                <TabsContent
                  value="qris"
                  className="p-4 bg-muted rounded-md mt-2"
                >
                  <div className="flex flex-col items-center">
                    <div className="bg-white p-4 rounded-md mb-2">
                      <img
                        src="https://api.dicebear.com/7.x/identicon/svg?seed=qris"
                        alt="QRIS Code"
                        className="w-32 h-32"
                      />
                    </div>
                    <p className="text-sm">
                      Scan kode QR untuk pembayaran digital.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCheckoutDialogOpen(false)}
            >
              Batal
            </Button>
            <Button onClick={processPayment}>
              <Printer className="mr-2 h-4 w-4" /> Proses & Cetak Struk
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default POSInterface;
