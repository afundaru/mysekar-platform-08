
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from '@/contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <AuthProvider>
          <div className="App">
            <Toaster />
            <AppRoutes />
          </div>
        </AuthProvider>
      </TooltipProvider>
    </BrowserRouter>
  );
}

export default App;
