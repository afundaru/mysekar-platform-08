
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { register } from './serviceWorkerRegistration';

// For debugging React
console.log('React version:', React.version);
console.log('useState available:', React.useState ? 'Yes' : 'No');

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register the service worker
register();
