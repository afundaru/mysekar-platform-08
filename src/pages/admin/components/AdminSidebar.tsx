
import React from "react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Users, MessageSquare, Flag, Gavel, LogOut, ShieldCheck } from "lucide-react";
import SignOutButton from "@/components/auth/SignOutButton";

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
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Kelola Admin">
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
