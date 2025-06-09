CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  barcode TEXT,
  stock INTEGER NOT NULL DEFAULT 0,
  min_stock INTEGER DEFAULT 0,
  description TEXT,
  supplier TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_barcode ON products(barcode);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);

INSERT INTO products (name, price, category, stock, min_stock, barcode, description, supplier) VALUES
('Indomie Goreng', 3500, 'Makanan', 50, 10, '8992753102504', 'Mie instan rasa ayam goreng', 'PT Indofood'),
('Aqua 600ml', 5000, 'Minuman', 30, 15, '8992952042309', 'Air mineral dalam kemasan', 'PT Aqua Golden Mississippi'),
('Teh Botol Sosro', 6000, 'Minuman', 25, 12, '8992761002001', 'Teh dalam kemasan botol', 'PT Sinar Sosro'),
('Sabun Lifebuoy', 4500, 'Perawatan', 20, 8, '8992772051001', 'Sabun mandi antibakteri', 'PT Unilever Indonesia'),
('Pepsodent', 12000, 'Perawatan', 15, 5, '8992772076004', 'Pasta gigi untuk keluarga', 'PT Unilever Indonesia'),
('Chitato', 10000, 'Makanan', 40, 15, '8992688218001', 'Keripik kentang rasa original', 'PT Indofood Fritolay Makmur'),
('Pocari Sweat', 7500, 'Minuman', 35, 10, '8992696427001', 'Minuman isotonik', 'PT Pocari Sweat Indonesia'),
('Mie Sedaap', 3000, 'Makanan', 45, 12, '8992952042101', 'Mie instan rasa ayam bawang', 'PT Karunia Alam Segar');

alter publication supabase_realtime add table products;