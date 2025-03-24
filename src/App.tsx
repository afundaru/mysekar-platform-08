
import React, { useEffect } from 'react';
import { Toaster } from 'sonner';
import AppRoutes from './routes/AppRoutes';

function App() {
  useEffect(() => {
    // Add detailed React version logging
    console.log("React version:", React.version);
    console.log("App component mounted");
    
    // Check if React hooks are available
    console.log("useState available:", typeof React.useState === 'function');
    console.log("useEffect available:", typeof React.useEffect === 'function');
    
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

// Add explicit React check
console.log("App.tsx - React loaded:", !!React);
console.log("App.tsx - React version:", React.version);

export default App;
