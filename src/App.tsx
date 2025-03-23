
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import OtpVerification from '@/pages/OtpVerification';
import RegistrationSuccess from '@/pages/RegistrationSuccess';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import ForumDiskusi from '@/pages/ForumDiskusi';
import Pengaduan from '@/pages/Pengaduan';
import KonsultasiHukum from '@/pages/KonsultasiHukum';
import AIConsultation from '@/pages/AIConsultation';
import LiveChat from '@/pages/LiveChat';
import NotFound from '@/pages/NotFound';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminRoute from '@/components/auth/AdminRoute';
import AdminApp from '@/pages/admin/AdminApp';
import AnnouncementDetails from '@/pages/AnnouncementDetails';
import AnnouncementsList from '@/pages/AnnouncementsList';

function App() {
  return (
    <React.StrictMode>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <div className="App">
              <Toaster />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/announcements" element={<AnnouncementsList />} />
                <Route path="/announcements/:id" element={<AnnouncementDetails />} />
                
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/otp-verification" element={<OtpVerification />} />
                <Route path="/registration-success" element={<RegistrationSuccess />} />
                
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/forum" element={
                  <ProtectedRoute>
                    <ForumDiskusi />
                  </ProtectedRoute>
                } />
                <Route path="/pengaduan" element={
                  <ProtectedRoute>
                    <Pengaduan />
                  </ProtectedRoute>
                } />
                <Route path="/konsultasi" element={
                  <ProtectedRoute>
                    <KonsultasiHukum />
                  </ProtectedRoute>
                } />
                <Route path="/konsultasi/ai" element={
                  <ProtectedRoute>
                    <AIConsultation />
                  </ProtectedRoute>
                } />
                <Route path="/konsultasi/chat" element={
                  <ProtectedRoute>
                    <LiveChat />
                  </ProtectedRoute>
                } />
                <Route path="/admin/*" element={
                  <AdminRoute>
                    <AdminApp />
                  </AdminRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </React.StrictMode>
  );
}

export default App;
