
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { toast } from 'sonner';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';

// Add diagnostic logging for React
console.log("main.tsx - React loaded:", !!React);
console.log("main.tsx - React version:", React.version);
console.log("main.tsx - useState available:", typeof React.useState === 'function');

// Make sure we're using the correct element for mounting
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Make sure there is a div with id "root" in your HTML file.');
}

// Create root outside of render to help with debugging
const root = ReactDOM.createRoot(rootElement);

// Add more diagnostic logging
console.log("ReactDOM.createRoot successful");

// Root React element with provider hierarchy
// IMPORTANT: BrowserRouter must wrap the entire app, including AuthProvider
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

console.log("Root render called");

// Register service worker for offline support
serviceWorkerRegistration.register({
  onSuccess: () => {
    console.log('Service Worker: Registered successfully');
  },
  onUpdate: () => {
    toast.info('Aplikasi telah diperbarui. Silakan refresh halaman untuk melihat versi terbaru.');
  },
  onOffline: () => {
    toast.warning('Anda sedang offline. Beberapa fitur mungkin tidak tersedia.');
  },
  onOnline: () => {
    toast.success('Anda kembali online.');
  }
});
