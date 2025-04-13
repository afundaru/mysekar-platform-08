
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-dark p-4">
      <div className="text-center glass-card p-8 rounded-2xl max-w-md w-full animate-fade-in">
        <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold text-error">404</span>
        </div>
        <h1 className="text-2xl font-bold mb-4">Halaman Tidak Ditemukan</h1>
        <p className="text-text-secondary mb-8">Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.</p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center sekar-button-primary"
        >
          <Home size={18} className="mr-2" />
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
};

export default NotFound;
