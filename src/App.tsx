
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OtpVerification from "./pages/OtpVerification";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import Dashboard from "./pages/Dashboard";
import KonsultasiHukum from "./pages/KonsultasiHukum";
import AIConsultation from "./pages/AIConsultation";
import LiveChat from "./pages/LiveChat";
import Pengaduan from "./pages/Pengaduan";
import Profile from "./pages/Profile";
import ForumDiskusi from "./pages/ForumDiskusi";
import NotFound from "./pages/NotFound";
import Admin from "./pages/admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
