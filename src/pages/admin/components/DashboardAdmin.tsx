
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, MessageSquare, Flag, Gavel, ShieldCheck, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const DashboardAdmin = () => {
  const { user } = useAuth();
  const [networkStatus, setNetworkStatus] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setNetworkStatus(true);
    const handleOffline = () => setNetworkStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Admin MySEKAR</h1>
      
      {!networkStatus && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4 rounded">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
            <p className="text-amber-700">
              Anda sedang dalam mode offline. Beberapa fitur mungkin tidak tersedia.
            </p>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-teal" />
                <h2 className="text-lg font-semibold">Keanggotaan</h2>
              </div>
              <p className="text-sm text-gray-600">Kelola pendaftaran dan data anggota.</p>
              <Link to="/admin/keanggotaan" className="mt-2">
                <Button className="w-full bg-teal hover:bg-teal/90">Kelola</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-teal" />
                <h2 className="text-lg font-semibold">Forum & Komunikasi</h2>
              </div>
              <p className="text-sm text-gray-600">Moderasi forum dan kirim pengumuman.</p>
              <Link to="/admin/forum" className="mt-2">
                <Button className="w-full bg-teal hover:bg-teal/90">Kelola</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Flag className="h-5 w-5 text-teal" />
                <h2 className="text-lg font-semibold">Pengaduan</h2>
              </div>
              <p className="text-sm text-gray-600">Tinjau laporan dan berikan respons.</p>
              <Link to="/admin/pengaduan" className="mt-2">
                <Button className="w-full bg-teal hover:bg-teal/90">Kelola</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Gavel className="h-5 w-5 text-teal" />
                <h2 className="text-lg font-semibold">Konsultasi Hukum</h2>
              </div>
              <p className="text-sm text-gray-600">Monitor AI dan distribusi kasus.</p>
              <Link to="/admin/konsultasi" className="mt-2">
                <Button className="w-full bg-teal hover:bg-teal/90">Kelola</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-teal" />
                <h2 className="text-lg font-semibold">Kelola Admin</h2>
              </div>
              <p className="text-sm text-gray-600">Atur hak akses admin sistem.</p>
              <Link to="/admin/add-admin" className="mt-2">
                <Button className="w-full bg-teal hover:bg-teal/90">Kelola</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardAdmin;
