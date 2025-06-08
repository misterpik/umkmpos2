import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import LoginForm from "./auth/LoginForm";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <img
            src="https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=120&q=80"
            alt="KasirAI Logo"
            className="h-16 w-16 rounded-lg shadow-md"
          />
        </div>
        <h1 className="text-3xl font-bold text-blue-800">KasirAI UMKM</h1>
        <p className="text-gray-600 mt-2">
          Sistem Kasir Pintar untuk UMKM Indonesia
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md"
      >
        <Card className="border-blue-200 shadow-lg bg-white">
          <CardContent className="pt-6">
            <LoginForm />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 text-center text-sm text-gray-500"
      >
        <p>© 2023 KasirAI UMKM. Semua hak dilindungi.</p>
        <div className="mt-2 flex justify-center space-x-4">
          <a href="#" className="hover:text-blue-600 transition-colors">
            Bantuan
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors">
            Syarat & Ketentuan
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors">
            Privasi
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
