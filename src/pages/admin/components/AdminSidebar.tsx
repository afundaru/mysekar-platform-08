
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Users, MessageSquare, Flag, Gavel, LogOut, ShieldCheck, Megaphone } from "lucide-react";
import SignOutButton from "@/components/auth/SignOutButton";

const AdminSidebar = () => {
  const location = useLocation();
  
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
            <SidebarMenuButton asChild tooltip="Dashboard" className={location.pathname === "/admin" ? "bg-teal/10" : ""}>
              <Link to="/admin">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Keanggotaan" className={location.pathname === "/admin/keanggotaan" ? "bg-teal/10" : ""}>
              <Link to="/admin/keanggotaan">
                <Users />
                <span>Keanggotaan</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Forum" className={location.pathname === "/admin/forum" ? "bg-teal/10" : ""}>
              <Link to="/admin/forum">
                <MessageSquare />
                <span>Forum & Komunikasi</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Pengumuman" className={location.pathname === "/admin/announcements" ? "bg-teal/10" : ""}>
              <Link to="/admin/announcements">
                <Megaphone />
                <span>Pengumuman & Berita</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Pengaduan" className={location.pathname === "/admin/pengaduan" ? "bg-teal/10" : ""}>
              <Link to="/admin/pengaduan">
                <Flag />
                <span>Pengaduan</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Konsultasi" className={location.pathname === "/admin/konsultasi" ? "bg-teal/10" : ""}>
              <Link to="/admin/konsultasi">
                <Gavel />
                <span>Konsultasi Hukum</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Kelola Admin" className={location.pathname === "/admin/add-admin" ? "bg-teal/10" : ""}>
              <Link to="/admin/add-admin">
                <ShieldCheck />
                <span>Kelola Admin</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <SignOutButton className="w-full flex items-center gap-2 justify-center" />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
