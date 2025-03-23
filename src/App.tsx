
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'sonner';
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from '@/contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <TooltipProvider>
        <AuthProvider>
          <div className="App">
            <Toaster />
            <AppRoutes />
          </div>
        </AuthProvider>
      </TooltipProvider>
    </Router>
  );
}

export default App;
