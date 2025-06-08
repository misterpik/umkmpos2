import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  LineChart,
  PieChart,
  Activity,
  TrendingUp,
  Package,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface SalesAnalyticsProps {
  salesData?: {
    dailySales: number[];
    monthlySales: number[];
    topProducts: Array<{ name: string; sales: number; percentage: number }>;
    inventoryAlerts: Array<{ name: string; stock: number; threshold: number }>;
  };
}

const SalesAnalytics = ({
  salesData = {
    dailySales: [42, 56, 78, 65, 89, 92, 76],
    monthlySales: [1200, 1350, 1500, 1750, 1600, 1800, 2100],
    topProducts: [
      { name: "Kopi Susu", sales: 156, percentage: 85 },
      { name: "Nasi Goreng", sales: 132, percentage: 75 },
      { name: "Mie Ayam", sales: 98, percentage: 60 },
      { name: "Es Teh", sales: 87, percentage: 55 },
      { name: "Roti Bakar", sales: 76, percentage: 45 },
    ],
    inventoryAlerts: [
      { name: "Gula", stock: 5, threshold: 10 },
      { name: "Beras", stock: 8, threshold: 15 },
      { name: "Minyak Goreng", stock: 3, threshold: 8 },
    ],
  },
}: SalesAnalyticsProps) => {
  return (
    <div className="bg-background p-6 w-full h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Analisis Penjualan</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Hari Ini</Badge>
          <Badge variant="outline">Minggu Ini</Badge>
          <Badge variant="outline">Bulan Ini</Badge>
          <Badge>Semua Waktu</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-2">
              <BarChart className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Total Penjualan Hari Ini
            </p>
            <h3 className="text-2xl font-bold">Rp 1.250.000</h3>
            <p className="text-xs text-green-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +15% dari kemarin
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-2">
              <LineChart className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Rata-rata Transaksi</p>
            <h3 className="text-2xl font-bold">Rp 75.000</h3>
            <p className="text-xs text-green-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +5% dari minggu lalu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-2">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Jumlah Transaksi</p>
            <h3 className="text-2xl font-bold">42</h3>
            <p className="text-xs text-green-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +8% dari kemarin
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-2">
              <PieChart className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Produk Terjual</p>
            <h3 className="text-2xl font-bold">156</h3>
            <p className="text-xs text-green-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +12% dari kemarin
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="sales">Tren Penjualan</TabsTrigger>
          <TabsTrigger value="products">Produk Terlaris</TabsTrigger>
          <TabsTrigger value="inventory">Status Inventaris</TabsTrigger>
          <TabsTrigger value="recommendations">Rekomendasi AI</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tren Penjualan Harian</CardTitle>
              <CardDescription>
                Analisis penjualan 7 hari terakhir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-end justify-between gap-2">
                {salesData.dailySales.map((sale, index) => (
                  <div
                    key={index}
                    className="relative h-full flex flex-col justify-end items-center"
                  >
                    <div
                      className="w-12 bg-primary rounded-t-md"
                      style={{
                        height: `${(sale / Math.max(...salesData.dailySales)) * 80}%`,
                      }}
                    />
                    <span className="text-xs mt-2">
                      {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"][index]}
                    </span>
                    <span className="text-xs font-medium">Rp {sale}k</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tren Penjualan Bulanan</CardTitle>
              <CardDescription>
                Analisis penjualan 7 bulan terakhir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-end justify-between gap-2">
                {salesData.monthlySales.map((sale, index) => (
                  <div
                    key={index}
                    className="relative h-full flex flex-col justify-end items-center"
                  >
                    <div
                      className="w-12 bg-primary/70 rounded-t-md"
                      style={{
                        height: `${(sale / Math.max(...salesData.monthlySales)) * 80}%`,
                      }}
                    />
                    <span className="text-xs mt-2">
                      {["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"][index]}
                    </span>
                    <span className="text-xs font-medium">Rp {sale}k</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Produk Terlaris</CardTitle>
              <CardDescription>
                Produk dengan penjualan tertinggi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesData.topProducts.map((product, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{product.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {product.sales} terjual
                      </span>
                    </div>
                    <Progress value={product.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Peringatan Stok</CardTitle>
              <CardDescription>
                Produk dengan stok di bawah ambang batas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesData.inventoryAlerts.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 rounded-full">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Stok: {item.stock} (Min: {item.threshold})
                        </p>
                      </div>
                    </div>
                    <Badge variant="destructive">Stok Rendah</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Rekomendasi AI</CardTitle>
              <CardDescription>
                Saran untuk meningkatkan bisnis Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md bg-primary/5">
                  <h3 className="font-medium mb-2">
                    Peluang Peningkatan Penjualan
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Berdasarkan analisis pola penjualan, menambahkan promosi
                    bundling untuk Kopi Susu dan Roti Bakar dapat meningkatkan
                    penjualan sebesar 15%.
                  </p>
                </div>

                <div className="p-4 border rounded-md bg-primary/5">
                  <h3 className="font-medium mb-2">Optimasi Inventaris</h3>
                  <p className="text-sm text-muted-foreground">
                    Stok Gula dan Minyak Goreng perlu segera diisi ulang.
                    Berdasarkan tren penjualan, sebaiknya tingkatkan stok Beras
                    sebesar 20% untuk mengantisipasi peningkatan permintaan.
                  </p>
                </div>

                <div className="p-4 border rounded-md bg-primary/5">
                  <h3 className="font-medium mb-2">Tren Pelanggan</h3>
                  <p className="text-sm text-muted-foreground">
                    Pelanggan paling aktif pada jam 7-9 pagi dan 12-2 siang.
                    Pertimbangkan untuk menambah staf pada jam-jam tersebut
                    untuk meningkatkan kecepatan layanan.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesAnalytics;
