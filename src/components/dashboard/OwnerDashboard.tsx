import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  LineChart,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  AlertCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import SalesAnalytics from "../analytics/SalesAnalytics";
import { useNavigate } from "react-router-dom";

interface OwnerDashboardProps {
  userName?: string;
  businessName?: string;
}

const OwnerDashboard = ({
  userName = "Budi Santoso",
  businessName = "Toko Sejahtera",
}: OwnerDashboardProps) => {
  const navigate = useNavigate();

  // Mock data for dashboard
  const salesData = {
    today: 2500000,
    yesterday: 2100000,
    growth: 19.05,
  };

  const inventoryData = {
    total: 156,
    lowStock: 12,
  };

  const topProducts = [
    { name: "Beras Premium 5kg", sales: 42, revenue: 2100000 },
    { name: "Minyak Goreng 1L", sales: 38, revenue: 760000 },
    { name: "Gula Pasir 1kg", sales: 35, revenue: 525000 },
    { name: "Telur Ayam 1kg", sales: 30, revenue: 450000 },
  ];

  const recentTransactions = [
    { id: "TRX-001", customer: "Ani", amount: 125000, time: "10:23" },
    { id: "TRX-002", customer: "Budi", amount: 87500, time: "11:45" },
    { id: "TRX-003", customer: "Citra", amount: 215000, time: "13:12" },
    { id: "TRX-004", customer: "Dodi", amount: 56000, time: "14:30" },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-primary p-2 rounded-md">
            <ShoppingCart className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-lg">KasirAI UMKM</h2>
            <p className="text-xs text-muted-foreground">{businessName}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Button variant="ghost" className="justify-start" size="sm">
            <BarChart3 className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            size="sm"
            onClick={() => navigate("/pos")}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            POS Interface
          </Button>
          <Button variant="ghost" className="justify-start" size="sm">
            <Package className="mr-2 h-4 w-4" />
            Inventory
          </Button>
          <Button variant="ghost" className="justify-start" size="sm">
            <Users className="mr-2 h-4 w-4" />
            Users
          </Button>
        </div>
        <div className="mt-auto pt-4 border-t">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=owner" />
              <AvatarFallback>BS</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground">Owner</p>
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Header 1
        </h1>
      </div>
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Selamat datang kembali, {userName}
            </p>
          </div>
          <Button onClick={() => navigate("/pos")}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Buka Kasir
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Penjualan Hari Ini
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-2xl font-bold">
                    {formatCurrency(salesData.today)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    vs {formatCurrency(salesData.yesterday)} kemarin
                  </p>
                </div>
                <div
                  className={`flex items-center ${salesData.growth > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">
                    {salesData.growth}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Status Inventaris
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-2xl font-bold">
                    {inventoryData.total} Produk
                  </div>
                  <div className="flex items-center text-amber-500">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span className="text-xs">
                      {inventoryData.lowStock} stok menipis
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Package className="h-4 w-4 mr-1" /> Kelola
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Transaksi Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentTransactions.slice(0, 2).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="text-sm">{transaction.customer}</p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.time}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      {formatCurrency(transaction.amount)}
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full mt-2">
                  Lihat Semua
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="analytics">
          <TabsList className="mb-4">
            <TabsTrigger value="analytics">Analisis Penjualan</TabsTrigger>
            <TabsTrigger value="inventory">Inventaris</TabsTrigger>
            <TabsTrigger value="recommendations">Rekomendasi AI</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Tren Penjualan</CardTitle>
                  <CardDescription>
                    Analisis penjualan 7 hari terakhir
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <SalesAnalytics />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Produk Terlaris</CardTitle>
                  <CardDescription>
                    Berdasarkan jumlah penjualan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            {product.name}
                          </span>
                          <span className="text-sm">
                            {product.sales} terjual
                          </span>
                        </div>
                        <Progress
                          value={(product.sales / topProducts[0].sales) * 100}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Status Inventaris</CardTitle>
                <CardDescription>Produk dengan stok menipis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 font-medium text-sm">
                    <div>Nama Produk</div>
                    <div>Stok Tersisa</div>
                    <div>Status</div>
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 text-sm items-center">
                      <div>Beras Premium 5kg</div>
                      <div>3 unit</div>
                      <Badge variant="destructive">Kritis</Badge>
                    </div>
                    <div className="grid grid-cols-3 text-sm items-center">
                      <div>Minyak Goreng 1L</div>
                      <div>5 unit</div>
                      <Badge variant="destructive">Kritis</Badge>
                    </div>
                    <div className="grid grid-cols-3 text-sm items-center">
                      <div>Gula Pasir 1kg</div>
                      <div>8 unit</div>
                      <Badge variant="outline">Menipis</Badge>
                    </div>
                    <div className="grid grid-cols-3 text-sm items-center">
                      <div>Telur Ayam 1kg</div>
                      <div>10 unit</div>
                      <Badge variant="outline">Menipis</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Rekomendasi AI untuk Bisnis Anda</CardTitle>
                <CardDescription>
                  Berdasarkan pola penjualan dan inventaris
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-amber-50 border-amber-200">
                    <h3 className="font-medium mb-2 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                      Stok Menipis
                    </h3>
                    <p className="text-sm">
                      Beras Premium 5kg dan Minyak Goreng 1L akan habis dalam 2
                      hari berdasarkan pola penjualan. Segera lakukan pemesanan
                      kembali.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                    <h3 className="font-medium mb-2 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                      Peluang Penjualan
                    </h3>
                    <p className="text-sm">
                      Penjualan produk susu meningkat 15% minggu ini.
                      Pertimbangkan untuk menambah variasi produk susu dan
                      menempatkannya di bagian depan toko.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                    <h3 className="font-medium mb-2 flex items-center">
                      <LineChart className="h-4 w-4 mr-2 text-green-500" />
                      Prediksi Penjualan
                    </h3>
                    <p className="text-sm">
                      Berdasarkan data 3 bulan terakhir, penjualan diperkirakan
                      akan meningkat 20% minggu depan. Pastikan stok produk
                      terlaris mencukupi.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OwnerDashboard;
