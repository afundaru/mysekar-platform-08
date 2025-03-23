
import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const OtpVerification = lazy(() => import("./pages/OtpVerification"));
const RegistrationSuccess = lazy(() => import("./pages/RegistrationSuccess"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const KonsultasiHukum = lazy(() => import("./pages/KonsultasiHukum"));
const AIConsultation = lazy(() => import("./pages/AIConsultation"));
const LiveChat = lazy(() => import("./pages/LiveChat"));
const Pengaduan = lazy(() => import("./pages/Pengaduan"));
const Profile = lazy(() => import("./pages/Profile"));
const ForumDiskusi = lazy(() => import("./pages/ForumDiskusi"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Admin = lazy(() => import("./pages/admin"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal"></div>
  </div>
);

// Initialize React Query with performance optimizations
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes (renamed from cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/otp-verification" element={<OtpVerification />} />
              <Route path="/registration-success" element={<RegistrationSuccess />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/konsultasi-hukum" element={
                <ProtectedRoute>
                  <KonsultasiHukum />
                </ProtectedRoute>
              } />
              <Route path="/konsultasi-hukum/ai" element={
                <ProtectedRoute>
                  <AIConsultation />
                </ProtectedRoute>
              } />
              <Route path="/konsultasi-hukum/live" element={
                <ProtectedRoute>
                  <LiveChat />
                </ProtectedRoute>
              } />
              <Route path="/pengaduan" element={
                <ProtectedRoute>
                  <Pengaduan />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/forum-diskusi" element={
                <ProtectedRoute>
                  <ForumDiskusi />
                </ProtectedRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin/*" element={<Admin />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
