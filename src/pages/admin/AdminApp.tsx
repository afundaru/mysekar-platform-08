
import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "./components/AdminSidebar";
import { Keanggotaan, Forum, Pengaduan, Konsultasi } from "./components/AdminModules";
import { toast } from "sonner";
import AddAdmin from "./AddAdmin"; // Import directly instead of lazy loading
import DashboardAdmin from "./components/DashboardAdmin"; // Import directly instead of lazy loading
import AnnouncementManager from "./components/AnnouncementManager"; // Add this import

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal"></div>
  </div>
);

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const handleError = () => {
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-xl text-red-500">Error pada aplikasi Admin</h1>
        <p>Silakan refresh halaman atau hubungi tim IT</p>
      </div>
    );
  }

  return <>{children}</>;
};

const AdminApp = () => {
  const location = useLocation();
  
  // Add console.log to help debug
  console.log("AdminApp rendered, pathname:", location.pathname);
  
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AdminSidebar />
          <div className="flex-1">
            <div className="bg-teal h-2" />
            <main className="p-4">
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route index element={<DashboardAdmin />} />
                  <Route path="keanggotaan" element={<Keanggotaan />} />
                  <Route path="forum" element={<Forum />} />
                  <Route path="pengaduan" element={<Pengaduan />} />
                  <Route path="konsultasi" element={<Konsultasi />} />
                  <Route path="add-admin" element={<AddAdmin />} />
                  <Route path="announcements" element={<AnnouncementManager />} /> {/* Add this route */}
                  <Route path="*" element={<Navigate to="/admin" replace />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  );
};

export default AdminApp;
