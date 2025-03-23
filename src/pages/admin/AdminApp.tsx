import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Users, MessageSquare, Flag, Gavel, LogOut } from "lucide-react";
import SignOutButton from "@/components/auth/SignOutButton";

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
      </div>
    </div>
  );
};

const AdminSidebar = () => {
  return (
    <Sidebar className="border-r" side="left">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="font-bold text-lg text-teal">MySEKAR</div>
          <div className="text-xs bg-teal text-white rounded px-2 py-0.5">Admin</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Dashboard">
              <Link to="/admin">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Keanggotaan">
              <Link to="/admin/keanggotaan">
                <Users />
                <span>Keanggotaan</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Forum">
              <Link to="/admin/forum">
                <MessageSquare />
                <span>Forum & Komunikasi</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Pengaduan">
              <Link to="/admin/pengaduan">
                <Flag />
                <span>Pengaduan</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Konsultasi">
              <Link to="/admin/konsultasi">
                <Gavel />
                <span>Konsultasi Hukum</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <SignOutButton className="w-full flex items-center gap-2 justify-center">
          <LogOut className="h-4 w-4" />
          <span>Keluar</span>
        </SignOutButton>
      </SidebarFooter>
    </Sidebar>
  );
};

const AdminApp = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <div className="flex-1">
          <div className="bg-teal h-2" />
          <main className="p-4">
            <Routes>
              <Route path="/" element={<DashboardAdmin />} />
              <Route path="/keanggotaan" element={<Keanggotaan />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/pengaduan" element={<Pengaduan />} />
              <Route path="/konsultasi" element={<Konsultasi />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const Keanggotaan = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Kelola Keanggotaan</h1>
      <Card>
        <CardContent className="p-6">
          <p>Kelola data keanggotaan dan verifikasi pendaftaran.</p>
        </CardContent>
      </Card>
    </div>
  );
};

const Forum = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Kelola Forum & Komunikasi</h1>
      <Card>
        <CardContent className="p-6">
          <p>Moderasi forum dan kirim pengumuman ke anggota.</p>
        </CardContent>
      </Card>
    </div>
  );
};

const Pengaduan = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Kelola Pengaduan</h1>
      <Card>
        <CardContent className="p-6">
          <p>Tinjau laporan pengaduan dari anggota.</p>
        </CardContent>
      </Card>
    </div>
  );
};

const Konsultasi = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Kelola Konsultasi Hukum</h1>
      <Card>
        <CardContent className="p-6">
          <p>Pantau percakapan AI dan distribusi kasus.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminApp;
