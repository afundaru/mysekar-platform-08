
import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "./components/AdminSidebar";
import { Keanggotaan, Forum, Pengaduan, Konsultasi } from "./components/AdminModules";

// Lazy load components for better performance
const DashboardAdmin = lazy(() => import("./components/DashboardAdmin"));
const AddAdmin = lazy(() => import("./AddAdmin"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal"></div>
  </div>
);

const AdminApp = () => {
  const location = useLocation();
  
  // Add console.log to help debug
  console.log("AdminApp rendered, pathname:", location.pathname);
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <div className="flex-1">
          <div className="bg-teal h-2" />
          <main className="p-4">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<DashboardAdmin />} />
                <Route path="/keanggotaan" element={<Keanggotaan />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/pengaduan" element={<Pengaduan />} />
                <Route path="/konsultasi" element={<Konsultasi />} />
                <Route path="/add-admin" element={<AddAdmin />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminApp;
