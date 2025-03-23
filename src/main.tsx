
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { toast } from 'sonner';
import { BrowserRouter as Router } from 'react-router-dom';
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { AuthProvider } from '@/contexts/AuthContext';

// Make sure we're using the correct element for mounting
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Make sure there is a div with id "root" in your HTML file.');
}

// Create root outside of render to help with debugging
const root = ReactDOM.createRoot(rootElement);

// Proper provider nesting to ensure React context works correctly
root.render(
  <React.StrictMode>
    <TooltipPrimitive.Provider>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </TooltipPrimitive.Provider>
  </React.StrictMode>
);

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
