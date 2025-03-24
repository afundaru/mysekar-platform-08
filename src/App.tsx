
import React from 'react';
import { Toaster } from 'sonner';
import AppRoutes from './routes/AppRoutes';
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  console.log("App rendering");
  return (
    <div className="App">
      <Toaster />
      <TooltipProvider>
        <AppRoutes />
      </TooltipProvider>
    </div>
  );
}

export default App;
