
import React from 'react';
import { Toaster } from 'sonner';
import AppRoutes from './routes/AppRoutes';

function App() {
  console.log("App rendering");
  return (
    <div className="App">
      <Toaster />
      <AppRoutes />
    </div>
  );
}

export default App;
