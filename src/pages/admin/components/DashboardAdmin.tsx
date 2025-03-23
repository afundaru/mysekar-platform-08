
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, MessageSquare, Flag, Gavel, ShieldCheck } from "lucide-react";

const DashboardAdmin = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Admin MySEKAR</h1>
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
