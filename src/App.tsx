
import React, { useEffect } from 'react';
import { Toaster } from 'sonner';
import AppRoutes from './routes/AppRoutes';

function App() {
  useEffect(() => {
    console.log("App component mounted");
    return () => {
      console.log("App component unmounted");
    };
  }, []);
  
  return (
    <div className="App">
      <Toaster />
      <AppRoutes />
    </div>
  );
}

export default App;
