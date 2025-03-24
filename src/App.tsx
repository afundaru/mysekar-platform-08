
import React from 'react';
import { Toaster } from 'sonner';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="App">
      <Toaster />
      <AppRoutes />
    </div>
  );
}

export default App;
