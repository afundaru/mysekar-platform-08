
import React from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center glass-card p-8 rounded-2xl max-w-md w-full animate-fade-in">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold text-red-500">404</span>
        </div>
        <h1 className="text-2xl font-bold mb-4">Halaman Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-8">Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.</p>
        <button 
          onClick={() => window.location.href = '/'}
          className="inline-flex items-center justify-center bg-teal text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1"
        >
          <Home size={18} className="mr-2" />
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};

export default NotFound;
